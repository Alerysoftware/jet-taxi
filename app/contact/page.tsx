"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle, Phone, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
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
            {t("contact.backToHome")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t("contact.title")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t("contact.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                {t("contact.methods")}
              </h2>

              <div className="space-y-4">
                {/* WhatsApp Button */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    {t("contact.whatsapp")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{t("contact.whatsappDesc")}</p>
                  <a
                    href="https://wa.me/905338806808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("contact.openWhatsapp")}
                  </a>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  {/* Phone Button */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                      <Phone className="h-5 w-5 text-yellow-500" />
                      {t("contact.phoneCall")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{t("contact.phoneDesc")}</p>
                    <a
                      href="tel:+905338806808"
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {t("contact.callNow")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                {t("contact.information")}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t("contact.phoneNumber")}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("common.phone")}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("contact.available247")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t("contact.location")}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">İskele, Gazimağusa</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("contact.cyprus")}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("contact.licensePlate")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t("contact.operatingHours")}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("contact.service247")}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("contact.availableEveryDay")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mt-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              {t("contact.servicesOverview")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-500">
                  {t("contact.vipServices")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t("contact.vipDesc")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {t("contact.taxiServices")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t("contact.taxiDesc")}</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {t("contact.viewAllServices")}
              </Link>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
              {t("contact.emergencyContact")}
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-3 text-sm">{t("contact.emergencyDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+905338806808"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                {t("contact.emergencyCall")}
              </a>
              <a
                href="https://wa.me/905338806808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                {t("contact.emergencyWhatsapp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
