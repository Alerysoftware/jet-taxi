"use client"

import { Car, Clock, MapPin, Check } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{t("services.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center mb-3">
              <Car className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {t("services.airportTransfers")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t("services.airportDesc")}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center mb-3">
              <MapPin className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t("services.cityTours")}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t("services.cityToursDesc")}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t("services.availability")}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t("services.availabilityDesc")}</p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
            {t("services.premiumFleet")}
          </h3>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-300">{t("services.premiumDesc")}</p>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-4xl mx-auto">
            <div className="flex-1 flex justify-center">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("services.luxuryVehicles")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("services.professionalDrivers")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("services.airConditioned")}
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-xs">
                <Image
                  src="/images/JetTaxi.jpg"
                  alt="Jet Taxi Mercedes-Benz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
