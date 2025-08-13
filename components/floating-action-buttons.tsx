"use client"

import { Phone, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 flex flex-col gap-3 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <a
        href="tel:+905338806808"
        className="bg-yellow-500 hover:bg-yellow-600 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href="https://wa.me/905338806808"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  )
}
