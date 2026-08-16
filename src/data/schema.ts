import { church } from './church';
import { siteFaqs } from './faq';

export const SITE_ORIGIN = 'https://www.calvaryfrederick.com';

export function churchJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': `${SITE_ORIGIN}/#church`,
    name: church.name,
    alternateName: 'Calvary Chapel Frederick Maryland',
    description:
      'A Calvary Chapel in downtown Frederick, Maryland, teaching the Bible verse by verse. Sunday 9:00 AM and 11:00 AM, Wednesday 7:00 PM.',
    url: SITE_ORIGIN,
    telephone: church.phone,
    email: church.email,
    slogan: church.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: church.address.line,
      addressLocality: church.address.city,
      addressRegion: church.address.region,
      postalCode: church.address.postal,
      addressCountry: 'US',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address.mapsQuery)}`,
    sameAs: [church.social.instagram, church.social.facebook, church.media.youtube],
    founder: {
      '@type': 'Person',
      name: `Pastor ${church.pastor.name}`,
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[] = siteFaqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}
