"use client"

import Image from "next/image"
import { Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Script from "next/script"

export default function HeroSection() {
  const { t } = useLanguage()

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Elite Taxi",
    "description": "Professional taxi service in Famagusta, Cyprus. Available 24/7 for all your transportation needs.",
    "url": "https://jettaxi.com",
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
    "areaServed": "Famagusta, Cyprus",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Taxi Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Airport Transfer",
            "description": "Reliable airport pickup and drop-off service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "City Tours",
            "description": "Explore Cyprus with experienced drivers"
          }
        }
      ]
    },
    "sameAs": [
      "https://wa.me/905338806808"
    ]
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <section className="w-full bg-white dark:bg-gray-900 py-8 md:py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/JetTaxi.jpg"
                  alt="Jet Taxi Mercedes-Benz in front of Grand Sapphire"
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-lg"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-wider text-yellow-500">{t("hero.title")}</h1>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <span className="text-xl font-medium text-gray-900 dark:text-white">{t("hero.phone")}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                    <span className="text-xl font-medium text-gray-900 dark:text-white">{t("hero.location")}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-7">
                    <span className="text-xl font-medium text-gray-900 dark:text-white">{t("hero.licensePlate")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <p className="text-lg text-gray-700 dark:text-gray-300">{t("hero.description")}</p>
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://wa.me/905338806808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
                  >
                    {t("hero.bookNow")}
                  </a>
                  <a
                    href="tel:+905338806808"
                    className="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
                  >
                    {t("hero.callUs")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
