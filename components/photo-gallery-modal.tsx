"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  id: number
  src: string
  alt: string
  title: string
}

interface PhotoGalleryModalProps {
  photos: Photo[]
  isOpen: boolean
  onClose: () => void
  initialPhotoIndex: number
}

export default function PhotoGalleryModal({ photos, isOpen, onClose, initialPhotoIndex }: PhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex)
  const [zoom, setZoom] = useState(1) // Start at original size (1x)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCurrentIndex(initialPhotoIndex)
    setZoom(1) // Always start at original size
    setPosition({ x: 0, y: 0 })
  }, [initialPhotoIndex, isOpen])

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setZoom(1) // Reset to original size when changing photos
    setPosition({ x: 0, y: 0 })
  }

  const goToNext = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setZoom(1) // Reset to original size when changing photos
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5))
    if (zoom <= 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoom > 1) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setPosition({
        x: (x - 0.5) * (zoom - 1) * -100,
        y: (y - 0.5) * (zoom - 1) * -100,
      })
    }
  }

  const currentPhoto = photos[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black">
        <div className="relative w-full h-[95vh] flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Photo Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Main Image */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move p-4"
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative transition-transform duration-200 ease-out max-w-full max-h-full"
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              }}
            >
              <Image
                src={currentPhoto?.src || "/placeholder.svg"}
                alt={currentPhoto?.alt || ""}
                width={1400}
                height={1000}
                className="max-w-full max-h-[85vh] object-contain"
                priority
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "85vh",
                }}
              />
            </div>
          </div>

          {/* Photo Title */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 text-white px-4 py-2 rounded-lg">
            <h3 className="text-lg font-semibold">{currentPhoto?.title}</h3>
          </div>

          {/* Thumbnail Navigation */}
          {photos.length > 1 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 bg-black/50 p-2 rounded-lg max-w-md overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setCurrentIndex(index)
                    setZoom(1) // Reset to original size when selecting thumbnail
                    setPosition({ x: 0, y: 0 })
                  }}
                  className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    index === currentIndex ? "border-yellow-500" : "border-transparent"
                  }`}
                >
                  <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
