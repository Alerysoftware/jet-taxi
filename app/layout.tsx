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
  title: "Jet Taxi - İskele, Famagusta",
  description: "Professional taxi service in Famagusta. Available 24/7 for all your transportation needs. Luxury Mercedes-Benz fleet, airport transfers, city tours.",
  keywords: "taxi, famagusta, iskele, airport transfer, luxury taxi, mercedes benz, cyprus taxi, 24/7 taxi",
  authors: [{ name: "Jet Taxi Team" }],
  creator: "Jet Taxi",
  publisher: "Jet Taxi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jettaxi.com'),
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
    url: 'https://jettaxi.com',
    siteName: 'Jet Taxi',
    title: 'Jet Taxi - Professional Taxi Service in Famagusta',
    description: 'Luxury Mercedes-Benz taxi service in Famagusta. 24/7 airport transfers, city tours, and premium transportation.',
    images: [
      {
        url: '/images/JetTaxi.jpg',
        width: 1200,
        height: 1600,
        alt: 'Jet Taxi Mercedes-Benz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jet Taxi - Professional Taxi Service in Famagusta',
    description: 'Luxury Mercedes-Benz taxi service in Famagusta. 24/7 airport transfers, city tours, and premium transportation.',
    images: ['/images/JetTaxi.jpg'],
    creator: '@jettaxi',
    site: '@jettaxi',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  generator: 'Next.js 15',
  applicationName: 'Jet Taxi',
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
    title: 'Jet Taxi',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Jet Taxi',
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
