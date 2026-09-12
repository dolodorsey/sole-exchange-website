import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 6 * 1024 * 1024;

export async function POST(request) {
  try {
    const hook = process.env.N8N_INTAKE_WEBHOOK;
    if (!hook) return NextResponse.json({ error: 'The intake connection is temporarily unavailable.' }, { status: 503 });

    const incoming = await request.formData();
    const required = ['submission_type', 'first_name', 'last_name', 'email', 'city', 'state', 'details', 'consent'];
    for (const field of required) {
      if (!String(incoming.get(field) || '').trim()) return NextResponse.json({ error: `Please complete ${field.replaceAll('_', ' ')}.` }, { status: 400 });
    }

    const photos = incoming.getAll('pair_photos').filter(value => value && typeof value === 'object' && 'size' in value && value.size > 0);
    if (photos.length > MAX_FILES) return NextResponse.json({ error: 'Upload no more than 5 pair photos.' }, { status: 400 });
    if (photos.some(file => file.size > MAX_FILE_SIZE)) return NextResponse.json({ error: 'Each pair photo must be 6 MB or smaller.' }, { status: 400 });

    const outgoing = new FormData();
    for (const [key, value] of incoming.entries()) {
      if (key === 'pair_photos') continue;
      outgoing.append(key, value);
    }
    photos.forEach(file => outgoing.append('pair_photos', file, file.name || 'pair-photo.jpg'));
    outgoing.set('brand', 'Sole Exchange');
    outgoing.set('source', 'sole-exchange-worldwide-duplicate');
    outgoing.set('submitted_at', new Date().toISOString());

    const upstream = await fetch(hook, { method: 'POST', body: outgoing, cache: 'no-store' });
    if (!upstream.ok) {
      console.error('Sole Exchange intake rejected', { status: upstream.status });
      return NextResponse.json({ error: 'The intake service could not accept the request.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Sole Exchange exchange intake failed', error);
    return NextResponse.json({ error: 'The request could not be sent. Please try again.' }, { status: 500 });
  }
}
