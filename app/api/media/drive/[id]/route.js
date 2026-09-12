import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED = new Set([
  '1odzGxCBItZXA0LWunNPaSeo7HlNjuKHh',
  '1lv25dsoUvojYieIFxmd5IZLIndiGenkU',
  '1scBoa6oPh87YboU_gNm9s2exXqzQl50o',
  '1QloyRtB_PbLnpbFMmdcChP3ZZcObt1XK',
  '1-OExVn03YMpvP5dqL8oLWMU5gSqu_dti',
  '1e9ZGGJP6-hKgVRADfquM4ceAWpfxWMZF',
  '1t_MVq458fyVq5mrrHgIuZujP1gYAIlK0',
  '1w6vNHYR06K8cAP0xh0uKAmhzFqytgylg',
  '11w6s0y93OsusPVe9ntWzuOJs7yi0MMeb',
]);

export async function GET(request, context) {
  const { id } = await context.params;
  if (!ALLOWED.has(id)) return NextResponse.json({ error: 'Asset not allowed.' }, { status: 404 });
  try {
    const headers = new Headers({ 'User-Agent': 'Mozilla/5.0 SoleExchangeMedia/1.0' });
    const range = request.headers.get('range');
    if (range) headers.set('range', range);
    const urls = [
      `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
      `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}&confirm=t`,
    ];
    let upstream;
    for (const url of urls) {
      const response = await fetch(url, { headers, redirect: 'follow', cache: 'no-store' });
      const type = response.headers.get('content-type') || '';
      upstream = response;
      if (response.ok && !type.includes('text/html')) break;
    }
    if (!upstream || (!upstream.ok && upstream.status !== 206)) return NextResponse.json({ error: 'Asset unavailable.' }, { status: 502 });
    const out = new Headers();
    ['content-type','content-length','content-range','accept-ranges','etag','last-modified'].forEach(name => {
      const value = upstream.headers.get(name);
      if (value) out.set(name, value);
    });
    out.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');
    out.set('Content-Disposition', 'inline');
    out.set('X-Content-Type-Options', 'nosniff');
    return new Response(upstream.body, { status: upstream.status, headers: out });
  } catch (error) {
    console.error('Sole Drive media proxy failed', { id, error });
    return NextResponse.json({ error: 'Asset unavailable.' }, { status: 502 });
  }
}
