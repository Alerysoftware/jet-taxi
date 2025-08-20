import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/reviews'
        ]
      }
    ],
    sitemap: 'https://jettaxi.com/sitemap.xml',
    host: 'https://jettaxi.com'
  }
}
