"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Lazy load the comment section
const CommentSection = lazy(() => import("@/components/comment-section"))
// Lazy load the customer satisfaction section
const CustomerSatisfaction = lazy(() => import("@/components/customer-satisfaction"))

// Loading component
function ReviewsLoading() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-8">
      <div className="animate-pulse">
        <div className="text-center mb-8">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3 bg-card">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div>
                        <div className="h-4 bg-muted rounded w-20 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 text-muted" />
                      ))}
                    </div>
                  </div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="h-5 bg-muted rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home Button */}
      <div className="bg-card border-b">
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

      {/* Page Header */}
      <div className="bg-card">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">{t("reviews.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("reviewsPage.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Lazy Loaded Comments Section */}
      <Suspense fallback={<ReviewsLoading />}>
        <div className="bg-card">
          <CommentSection />
        </div>
      </Suspense>

      {/* Customer Satisfaction Section */}
      <Suspense fallback={
        <div className="bg-muted/50 py-8">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-64 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <div className="h-12 bg-muted rounded w-20 mx-auto mb-2"></div>
                      <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
        <CustomerSatisfaction />
      </Suspense>

      {/* Call to Action */}
      <div className="bg-yellow-50 dark:bg-yellow-500/10 py-8">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">{t("reviewsPage.tryJetTaxi")}</h3>
          <p className="text-muted-foreground mb-6">{t("reviewsPage.experienceService")}</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/905338806808"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t("reviewsPage.bookNow")}
            </a>
            <a
              href="tel:+905338806808"
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Ara: 0533 880 68 08
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
