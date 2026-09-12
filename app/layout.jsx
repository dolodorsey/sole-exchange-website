import './globals.css';

export const metadata = {
  metadataBase: new URL('https://soleexchangeworldwide.com'),
  title: 'Sole Exchange — Give Sneakers a Second Life',
  description: 'No-cost sneaker donation and request hub connecting quality sneakers with people and community organizations that need them.',
  keywords: ['Sole Exchange','sneaker donation','donate sneakers','request shoes','community sneaker drive','Air Force One drive'],
  openGraph: {
    title: 'Sole Exchange — Give Sneakers a Second Life',
    description: 'Give a pair. Request support. Move dignity forward.',
    url: 'https://soleexchangeworldwide.com',
    siteName: 'Sole Exchange',
    images: ['/brand/sole-hero.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sole Exchange — Give Sneakers a Second Life',
    description: 'Give a pair. Request support. Move dignity forward.',
    images: ['/brand/sole-hero.png'],
  },
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'NonprofitOrganization',
  name: 'Sole Exchange',
  url: 'https://soleexchangeworldwide.com',
  description: 'No-cost sneaker donation and request hub built around responsible collection, preparation, matching, and placement.',
};

export default function Layout({ children }) {
  return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}} /></head><body>{children}</body></html>;
}
