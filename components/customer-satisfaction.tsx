"use client"

import { Star, Users, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useReviews } from "@/hooks/use-reviews"
import { useEffect, useState } from "react"

export default function CustomerSatisfaction() {
  const { t } = useLanguage()
  const { reviews } = useReviews()
  const [stats, setStats] = useState({
    averageRating: 0,
    totalCustomers: 0,
    serviceHours: "7/24"
  })

  // İstatistikleri hesapla
  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length
      
      setStats({
        averageRating: Math.round(averageRating * 10) / 10, // 1 ondalık basamak
        totalCustomers: reviews.length,
        serviceHours: "7/24"
      })
    }
  }, [reviews])

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {t("reviewsPage.customerSatisfaction")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ortalama Puan */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              {stats.averageRating > 0 ? stats.averageRating : "4.8"}
            </div>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(stats.averageRating) 
                      ? 'text-yellow-500 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {t("reviewsPage.averageRating")}
            </p>
            {stats.averageRating === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Henüz yorum yok
              </p>
            )}
          </div>

          {/* Mutlu Müşteri */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-bold text-green-500 mb-2 flex items-center justify-center">
              <Users className="w-8 h-8 mr-2" />
              {stats.totalCustomers > 0 ? `${stats.totalCustomers}+` : "150+"}
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {t("reviewsPage.happyCustomers")}
            </p>
            {stats.totalCustomers === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Varsayılan değer
              </p>
            )}
          </div>

          {/* Hizmet Saati */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2 flex items-center justify-center">
              <Clock className="w-8 h-8 mr-2" />
              {stats.serviceHours}
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {t("reviewsPage.serviceHours")}
            </p>
          </div>
        </div>

        {/* Gerçek Zamanlı Bilgi */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats.averageRating > 0 
              ? `📊 ${stats.totalCustomers} müşteri yorumu`
              : "📊 Yorumlar yüklendikten sonra gerçek veriler görünecek"
            }
          </p>
        </div>
      </div>
    </section>
  )
}
