"use client"

import { useState, useCallback, Suspense, lazy, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// Lazy load heavy components
const ImageViewer = lazy(() => import('./image-viewer'))
const ShareModal = lazy(() => import('./share-modal'))

interface PhotoGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: Array<{
    src: string
    alt: string
    caption?: string
    category?: string
  }>
  initialIndex?: number
}

export default function PhotoGalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0
}: PhotoGalleryModalProps) {
  // Güvenlik kontrolü - images undefined ise erken dön
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null
  }

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // showShareModal state removed since share functionality is no longer needed

  const nextImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }
  }, [images])

  const previousImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }, [images])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') previousImage()
  }, [onClose, nextImage, previousImage])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, isOpen, images])

  const currentImage = images[currentIndex]

  // Download and Share functions removed since buttons are no longer displayed
  // const handleDownload = () => {
  //   if (currentImage) {
  //     const link = document.createElement('a')
  //     link.href = currentImage.src
  //     link.download = `jet-taxi-${currentIndex + 1}.jpg`
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //   }
  // }

  // const handleShare = () => {
  //   setShowShareModal(true)
  // }

  if (!isOpen || !currentImage) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-0">
          <DialogTitle className="hidden">Elite Taxi Foto Galerisi</DialogTitle>
          <div className="relative w-full h-[95vh]">
            {/* Header Controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Right Controls - Removed since they're already in ImageViewer */}
            {/* <div className="absolute top-4 right-4 z-50 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div> */}

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Main Image Viewer */}
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white">Yükleniyor...</div>
              </div>
            }>
              <ImageViewer
                src={currentImage.src}
                alt={currentImage.alt}
              />
            </Suspense>

            {/* Image Info - Removed for cleaner interface */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 text-white px-4 py-2 rounded-lg max-w-md text-center">
              {currentImage.caption && (
                <h3 className="text-lg font-semibold mb-1">{currentImage.caption}</h3>
              )}
              {currentImage.category && (
                <Badge variant="secondary" className="text-xs">
                  {currentImage.category}
                </Badge>
              )}
            </div> */}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 bg-black/50 p-2 rounded-lg max-w-md overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                      index === currentIndex ? "border-yellow-500" : "border-transparent"
                    }`}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal - Removed since share functionality is no longer needed */}
      {/* <Suspense fallback={null}>
        <ShareModal
          isOpen={false}
          onClose={() => {}}
          title={currentImage.caption || "Elite Taxi"}
          url={currentImage.src}
          description={currentImage.alt}
        />
      </Suspense> */}
    </>
  )
}
