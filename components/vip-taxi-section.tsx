"use client"

import { useState } from "react"
import Image from "next/image"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import PhotoGalleryModal from "./photo-gallery-modal"
import { useLanguage } from "@/contexts/language-context"

export default function VipTaxiSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const { t } = useLanguage()

  // Real Vito taxi photos
  const vitoGallery = [
    {
      id: 1,
      src: "/images/vito-front-angle.jpg",
      alt: "Mercedes Vito VIP - Front Angle View",
      title: "Mercedes Vito VIP - Profesyonel Görünüm",
    },
    {
      id: 2,
      src: "/images/vito-front-side.jpg",
      alt: "Mercedes Vito VIP - Front Side View",
      title: "Mercedes Vito VIP - Şık Tasarım",
    },
    {
      id: 3,
      src: "/images/vito-residential.jpg",
      alt: "Mercedes Vito VIP - Residential Area",
      title: "Mercedes Vito VIP - Şehir İçi Hizmet",
    },
    {
      id: 4,
      src: "/images/vito-rear-side.jpg",
      alt: "Mercedes Vito VIP - Rear Side View",
      title: "Mercedes Vito VIP - Arka Görünüm",
    },
  ]

  const openGallery = (index = 0) => {
    setSelectedPhotoIndex(index)
    setIsGalleryOpen(true)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Crown className="h-7 w-7 text-yellow-500" />
        <h2 className="text-2xl font-bold">{t("vip.title")}</h2>
      </div>

      {/* Single VIP Vito Card - Left Aligned with Darker Background */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 dark:from-yellow-700/40 dark:to-yellow-800/50 rounded-lg p-6 border-2 border-yellow-500 dark:border-yellow-600/70 shadow-lg hover:shadow-xl transition-shadow">
          <div
            className="relative h-64 mb-4 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(0)}
          >
            <Image
              src="/images/vito-front-angle.jpg"
              alt="Mercedes Vito VIP Taxi"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-2 rounded-full text-sm font-bold text-black shadow-lg">
                {t("taxi.clickGallery")} ({vitoGallery.length} {t("taxi.photos")})
              </div>
            </div>
          </div>

          <h3 className="font-bold text-xl mb-3 text-white">Mercedes Vito VIP</h3>
          <p className="text-white mb-4 text-sm font-bold">{t("vip.vitoDesc1")}</p>

          <ul className="text-sm text-white space-y-2 mb-6 font-bold">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.spaciousInterior")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.premiumComfort")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.airConditioning")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.professionalService")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.luggageSpace")}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {t("vip.largeCapacity")}
            </li>
          </ul>

          <div className="flex gap-3">
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black flex-1 font-bold py-3"
              onClick={() => window.open("https://wa.me/905338806808", "_blank")}
            >
              {t("vip.bookVip")}
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4"
              onClick={() => window.open("tel:+905338806808")}
            >
              {t("vip.call")}
            </Button>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        photos={vitoGallery}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialPhotoIndex={selectedPhotoIndex}
      />
    </div>
  )
}
