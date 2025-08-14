"use client"

import { useState } from "react"
import Image from "next/image"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import PhotoGalleryModal from "./photo-gallery-modal"
import { useLanguage } from "@/contexts/language-context"

export default function RegularTaxiSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const [currentGallery, setCurrentGallery] = useState([])
  const { t } = useLanguage()

  // All Mercedes E-Class photos for the 1st card gallery
  const mercedesEClassGallery = [
    {
      id: 1,
      src: "/images/mercedes-eclass-main.jpg",
      alt: "Mercedes E-Class Premium at Grand Sapphire",
      caption: "Mercedes E-Class Premium - Grand Sapphire",
      category: "Premium Taxi"
    },
    {
      id: 2,
      src: "/images/eclass-grand-sapphire-night.jpg",
      alt: "Mercedes E-Class at Grand Sapphire Night",
      caption: "Mercedes E-Class - Grand Sapphire Gece Hizmeti",
      category: "Premium Taxi"
    },
    {
      id: 3,
      src: "/images/eclass-sunset-road.jpg",
      alt: "Mercedes E-Class Sunset Road",
      caption: "Mercedes E-Class - Gün Batımı Manzarası",
      category: "Premium Taxi"
    },
    {
      id: 4,
      src: "/images/eclass-classical-building.jpg",
      alt: "Mercedes E-Class at Classical Building",
      caption: "Mercedes E-Class - Klasik Mimari",
      category: "Premium Taxi"
    },
    {
      id: 5,
      src: "/images/eclass-grand-sapphire-smoke.jpg",
      alt: "Mercedes E-Class Grand Sapphire Dramatic",
      caption: "Mercedes E-Class - Grand Sapphire Dramatik",
      category: "Premium Taxi"
    },
    {
      id: 6,
      src: "/images/eclass-shopping-center.jpg",
      alt: "Mercedes E-Class at Shopping Center",
      caption: "Mercedes E-Class - Alışveriş Merkezi",
      category: "Premium Taxi"
    },
    {
      id: 7,
      src: "/images/eclass-grand-sapphire-front.jpg",
      alt: "Mercedes E-Class Grand Sapphire Front",
      caption: "Mercedes E-Class - Grand Sapphire Ön Görünüm",
      category: "Premium Taxi"
    },
    {
      id: 8,
      src: "/images/eclass-classical-columns.jpg",
      alt: "Mercedes E-Class Classical Columns",
      caption: "Mercedes E-Class - Klasik Sütunlar",
      category: "Premium Taxi"
    },
    {
      id: 9,
      src: "/images/eclass-sunset-airport.jpg",
      alt: "Mercedes E-Class Sunset Airport",
      caption: "Mercedes E-Class - Havalimanı Gün Batımı",
      category: "Premium Taxi"
    },
    {
      id: 10,
      src: "/images/eclass-luxury-entrance.jpg",
      alt: "Mercedes E-Class Luxury Entrance",
      caption: "Mercedes E-Class - Lüks Giriş",
      category: "Premium Taxi"
    },
    {
      id: 11,
      src: "/images/eclass-modern-building.jpg",
      alt: "Mercedes E-Class Modern Building",
      caption: "Mercedes E-Class - Modern Bina",
      category: "Premium Taxi"
    },
  ]

  // All 4 of your images for the 2nd card gallery
  const mercedesGallery = [
    {
      id: 1,
      src: "/images/taxi-interior-nigh.jpg",
      alt: "Mercedes E-Class Taxi at Grand Sapphire Night",
      caption: t("taxi.mercedesTitle"),
      category: "Standard Taxi"
    },
    {
      id: 2,
      src: "/images/nigh2.jpg",
      alt: "Mercedes Taxi - Red Interior Lighting",
      caption: "Lüks İç Mekan Deneyimi",
      category: "Standard Taxi"
    },
    {
      id: 3,
      src: "/images/taxi-interior-night.jpg",
      alt: "Mercedes Taxi - Interior Night View",
      caption: "Profesyonel Gece Hizmeti",
      category: "Standard Taxi"
    },
    {
      id: 4,
      src: "/images/taxi-interior-red.jpg",
      alt: "Mercedes Taxi - Exterior Day View",
      caption: "Premium İç Mekan Konforu",
      category: "Standard Taxi"
    },
  ]

  // New Mercedes E-Class TLP 959 gallery for 3rd card
  const mercedesEClassTLP959Gallery = [
    {
      id: 1,
      src: "/images/mercedes-eclass-sunset-construction.jpg",
      alt: "Mercedes E-Class TLP 959 - Sunset Construction Site",
      caption: "Mercedes E-Class - Modern Kalkınma Bölgesi",
      category: "Premium Taxi"
    },
    {
      id: 2,
      src: "/images/mercedes-eclass-sunset-rear.jpg",
      alt: "Mercedes E-Class TLP 959 - Sunset Rear View",
      caption: "Mercedes E-Class - Gün Batımı Arka Görünüm",
      category: "Premium Taxi"
    },
  ]

  const regularTaxis = [
    {
      id: 1,
      src: "/images/mercedes-eclass-main.jpg",
      alt: "Mercedes E-Class Premium at Grand Sapphire",
      title: t("taxi.eClassTitle"),
      features: [
        t("taxi.luxuryComfort"),
        t("taxi.premiumInterior"),
        t("taxi.professionalService"),
        t("taxi.modernTechnology"),
      ],
      description: t("taxi.eClassDesc"),
      hasGallery: true,
      gallery: mercedesEClassGallery,
    },
    {
      id: 2,
      src: "/images/taxi-interior-nigh.jpg", // Main image for the card
      alt: "Mercedes Taxi - Interior Night View",
      title: t("taxi.mercedesTitle"),
      features: [
        t("taxi.airConditioning"),
        t("taxi.comfortableSeating"),
        t("taxi.professionalDriver"),
        t("taxi.cleanInterior"),
        t("taxi.modernAmenities"),
      ],
      description: t("taxi.mercedesDesc"),
      hasGallery: true,
      gallery: mercedesGallery,
    },
    {
      id: 3,
      src: "/images/mercedes-eclass-sunset-construction.jpg",
      alt: "Mercedes E-Class TLP 959 - Modern Development Area",
      title: "Mercedes E-Class Taksi",
      features: [
        "Güvenilir ulaşım",
        "Temiz ve bakımlı araç",
        "Deneyimli şoför",
        "Klimalı konfor",
        "Modern donanım",
        "Profesyonel hizmet",
      ],
      description:
        "Kaliteli Mercedes E-Class taksi hizmeti. Günlük ulaşım ihtiyaçlarınız için güvenilir ve konforlu çözüm.",
      hasGallery: true,
      gallery: mercedesEClassTLP959Gallery,
    },
  ]

  const openGallery = (taxi: any, index = 0) => {
    if (taxi.hasGallery) {
      setSelectedPhotoIndex(index)
      setIsGalleryOpen(true)
      // Set the current gallery based on which card was clicked
      setCurrentGallery(taxi.gallery)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Car className="h-7 w-7 text-gray-600" />
        <h2 className="text-2xl font-bold">{t("taxi.title")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regularTaxis.map((taxi, index) => (
          <div
            key={taxi.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <div
              className={`relative h-48 mb-3 rounded-lg overflow-hidden group ${
                taxi.hasGallery ? "cursor-pointer" : ""
              }`}
              onClick={() => taxi.hasGallery && openGallery(taxi)}
            >
              <Image
                src={taxi.src || "/placeholder.svg"}
                alt={taxi.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {taxi.hasGallery && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-2 rounded-full text-sm font-bold text-black shadow-lg">
                    {t("taxi.clickGallery")} ({taxi.gallery?.length} {t("taxi.photos")})
                  </div>
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{taxi.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm font-medium">{taxi.description}</p>

            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-4 flex-grow">
              {taxi.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-auto">
              <Button
                variant="outline"
                className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex-1 bg-transparent text-sm py-2"
                onClick={() => window.open("https://wa.me/905338806808", "_blank")}
              >
                {t("taxi.bookNow")}
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent text-sm py-2"
                onClick={() => window.open("tel:+905338806808")}
              >
                {t("taxi.call")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Gallery Modal - for all Mercedes taxis */}
      {isGalleryOpen && (
        <PhotoGalleryModal
          images={currentGallery}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          initialIndex={selectedPhotoIndex}
        />
      )}
    </div>
  )
}
