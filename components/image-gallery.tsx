"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useLanguage()

  const images = [
    {
      src: "/images/JetTaxi.jpg",
      alt: "Jet Taxi Mercedes-Benz in front of Grand Sapphire",
      caption: t("fleet.caption"),
    },
    // You can add more images later
  ]

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{t("fleet.title")}</h2>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div className="relative max-w-lg">
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                priority
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous image</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          <p className="text-center mt-3 text-gray-700">{images[currentIndex].caption}</p>
        </div>
      </div>
    </section>
  )
}
