import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActionButtons from "@/components/floating-action-buttons"
import ErrorBoundary from "@/components/error-boundary"
import GoogleAnalytics from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Elite Taxi - İskele, Famagusta | Professional Taxi Service",
  description: "Professional taxi service in Famagusta, Cyprus. Available 24/7 for all your transportation needs. Luxury Mercedes-Benz fleet, airport transfers, city tours.",
  keywords: "taxi, famagusta, iskele, airport transfer, luxury taxi, mercedes benz, cyprus taxi, 24/7 taxi, vip taxi, airport pickup",
  authors: [{ name: "Elite Taxi Team" }],
  creator: "Elite Taxi",
  publisher: "Elite Taxi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elitetaxi.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr': '/tr',
      'en': '/en',
      'ru': '/ru',
      'el': '/el',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://elitetaxi.com',
    siteName: 'Elite Taxi',
    title: 'Elite Taxi - Professional Taxi Service in Famagusta',
    description: 'Luxury Mercedes-Benz taxi service in Famagusta. 24/7 airport transfers, city tours, and premium transportation.',
    images: [
      {
        url: '/images/JetTaxi.jpg',
        width: 1200,
        height: 1600,
        alt: 'Elite Taxi Mercedes-Benz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Taxi - Professional Taxi Service in Famagusta',
    description: 'Luxury Mercedes-Benz taxi service in Famagusta. 24/7 airport transfers, city tours, and premium transportation.',
    images: ['/images/JetTaxi.jpg'],
    creator: '@elitetaxi',
    site: '@elitetaxi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  generator: 'Next.js 15',
  applicationName: 'Elite Taxi',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#d97706' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'transportation',
  // PWA meta etiketleri
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Elite Taxi',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Elite Taxi',
    'msapplication-TileColor': '#f59e0b',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Elite Taxi",
              "description": "Professional taxi service in Famagusta, Cyprus",
              "url": "https://elitetaxi.com",
              "telephone": "+905338806808",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "İskele",
                "addressRegion": "Gazimağusa",
                "addressCountry": "CY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "35.3411",
                "longitude": "33.9197"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "currenciesAccepted": "EUR, TRY, USD",
              "paymentAccepted": "Cash, Credit Card",
              "serviceType": "Taxi Service",
              "areaServed": "Famagusta, Cyprus"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              {children}
              <Footer />
              <FloatingActionButtons />
              
              {/* Google Analytics */}
              {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
              )}
            </ThemeProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
