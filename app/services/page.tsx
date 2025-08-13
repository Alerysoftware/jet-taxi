"use client"

import VipTaxiSection from "@/components/vip-taxi-section"
import RegularTaxiSection from "@/components/regular-taxi-section"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back to Home Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("servicesPage.backToHome")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t("servicesPage.title")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t("servicesPage.subtitle")}</p>
        </div>

        <div className="space-y-12">
          <VipTaxiSection />
          <RegularTaxiSection />
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center mt-12 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t("servicesPage.needHelp")}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t("servicesPage.helpDesc")}</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/905338806808"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition-colors"
            >
              {t("servicesPage.whatsappUs")}
            </a>
            <a
              href="tel:+905338806808"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
            >
              {t("servicesPage.call")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
