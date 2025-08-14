"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerProps {
  src: string
  alt: string
}

export default function ImageViewer({ src, alt }: ImageViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
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

  const resetView = () => {
    setZoom(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    resetView()
  }, [src])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Controls */}
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
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={handleRotate}
        >
          <RotateCw className="h-5 w-5" />
        </Button>
        {/* Download button removed since it's not needed in main interface */}
        {/* {onDownload && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onDownload}
          >
            <Download className="h-5 w-5" />
          </Button>
        )} */}
      </div>

      {/* Reset Button - Removed for cleaner interface */}
      {/* <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
        onClick={resetView}
      >
        Reset View
      </Button> */}

      {/* Main Image */}
      <div
        className="relative w-full h-full flex items-center justify-center cursor-move p-4"
        onMouseMove={handleMouseMove}
      >
        <div
          className="relative transition-all duration-200 ease-out max-w-full max-h-full"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
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

      {/* Zoom Info */}
      <div className="absolute bottom-4 left-4 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  )
}
