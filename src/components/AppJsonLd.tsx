import { App } from '@/data/apps';

interface AppJsonLdProps {
  app: App;
}

export default function AppJsonLd({ app }: AppJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kosmicapps.com';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: app.name,
    description: app.hook,
    url: `${baseUrl}/apps/${app.slug}`,
    applicationCategory: 'MobileApplication',
    operatingSystem: 'iOS',
    offers: {
      '@type': 'Offer',
      price: app.pricingType === 'free' ? '0' : '1.99',
      priceCurrency: 'USD',
      availability: app.appStoreUrl ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100',
    },
    author: {
      '@type': 'Organization',
      name: 'Kosmic Apps',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kosmic Apps',
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
