"use client"

import Link from "next/link"
import { Phone, MapPin, Facebook } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const router = useRouter()
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToServices = () => {
    router.push("/services")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const navigateToContact = () => {
    router.push("/contact")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-3">ELITE TAXI</h3>
            <p className="mb-3 text-sm text-gray-300">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61575834839473"
                className="hover:text-yellow-500 transition-colors text-gray-400"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={scrollToTop}
                className="hover:text-yellow-500 transition-colors text-left text-sm text-gray-300"
              >
                {t("footer.home")}
              </button>
              <button
                onClick={navigateToServices}
                className="hover:text-yellow-500 transition-colors text-left text-sm text-gray-300"
              >
                {t("footer.services")}
              </button>
              <button
                onClick={navigateToContact}
                className="hover:text-yellow-500 transition-colors text-left text-sm text-gray-300"
              >
                {t("footer.contact")}
              </button>
            </nav>
          </div>

          <div id="contact">
            <h3 className="text-lg font-semibold mb-3 text-white">{t("footer.contactUs")}</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span className="text-sm text-gray-300">{t("common.phone")}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span className="text-sm text-gray-300">{t("common.location")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
