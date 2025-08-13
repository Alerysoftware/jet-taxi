"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Loader2, CheckCircle, AlertCircle, AlertTriangle, Languages, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "sonner"

interface Review {
  id: string
  name: string
  text: string
  rating: number
  created_at: string
  approved: boolean
}

interface TranslationState {
  [key: string]: {
    translated: boolean
    text: string
    targetLang: string
    loading: boolean
  }
}

export default function CommentSection() {
  const { t } = useLanguage()
  const [submitting, setSubmitting] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [spamAlert, setSpamAlert] = useState<{
    show: boolean
    message: string
    reasons?: string[]
  }>({ show: false, message: "" })
  const [translations, setTranslations] = useState<TranslationState>({})

  const [newComment, setNewComment] = useState({
    name: "",
    text: "",
    rating: 5
  })

  // Yorumları getir
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        if (data.reviews) {
          setReviews(data.reviews)
        }
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Çeviri fonksiyonu
  const translateComment = async (reviewId: string, text: string, targetLang: string) => {
    // Eğer zaten çevrilmişse, orijinal metne dön
    if (translations[reviewId]?.translated && translations[reviewId]?.targetLang === targetLang) {
      setTranslations(prev => ({
        ...prev,
        [reviewId]: {
          ...prev[reviewId],
          translated: false,
          text: text,
          targetLang: targetLang
        }
      }))
      return
    }

    setTranslations(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        loading: true
      }
    }))

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang
        }),
      })

      const result = await response.json()

      if (result.success) {
        setTranslations(prev => ({
          ...prev,
          [reviewId]: {
            translated: true,
            text: result.translatedText,
            targetLang: targetLang,
            loading: false
          }
        }))
        
        const langNames: { [key: string]: string } = {
          'tr': 'Türkçe',
          'en': 'İngilizce',
          'ru': 'Rusça',
          'el': 'Rumca'
        }
        
        toast.success(`${langNames[result.sourceLanguage] || 'Bilinmeyen'} yorum ${langNames[targetLang] || 'hedef dil'} diline çevrildi!`)
      } else {
        toast.error('Çeviri başarısız oldu')
      }
    } catch (error) {
      toast.error('Çeviri sırasında hata oluştu')
      setTranslations(prev => ({
        ...prev,
        [reviewId]: {
          ...prev[reviewId],
          loading: false
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSpamAlert({ show: false, message: "" }) // Reset spam alert
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name,
          rating: newComment.rating,
          text: newComment.text,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.isSpam) {
          // Spam alert'i göster
          setSpamAlert({
            show: true,
            message: result.message || "Yorumunuz spam olarak algılandı ve yayınlanmadı.",
            reasons: result.reasons || []
          })
          toast.error(result.message || "Yorumunuz spam olarak algılandı ve yayınlanmadı.")
        } else {
          toast.success(result.message || "Yorumunuz başarıyla gönderildi!")
          setNewComment({ name: "", text: "", rating: 5 })
          // Yorumları yeniden yükle
          const response = await fetch('/api/reviews')
          const data = await response.json()
          if (data.reviews) {
            setReviews(data.reviews)
          }
        }
      } else {
        toast.error(result.error || "Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      toast.error("Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full py-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">   
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Son Yorumlar
            </h3>
            
            {/* Scroll List Container - Sabit Yükseklik */}
            <div className="h-80 md:h-96 overflow-y-auto border rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>Yorumlar yükleniyor...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Henüz yorum yok. İlk yorumu siz yapın!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 border rounded-lg p-3 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold text-xs">
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {review.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 flex-shrink-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Yorum Metni */}
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {translations[review.id]?.translated 
                          ? translations[review.id].text 
                          : review.text
                        }
                      </p>
                      
                      {/* Çeviri Butonları */}
                      <div className="flex gap-1 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={() => translateComment(review.id, review.text, 'tr')}
                          disabled={translations[review.id]?.loading}
                        >
                          {translations[review.id]?.loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : translations[review.id]?.translated && translations[review.id]?.targetLang === 'tr' ? (
                            <>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Orijinal
                            </>
                          ) : (
                            <>
                              <Languages className="h-3 w-3 mr-1" />
                              TR
                            </>
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={() => translateComment(review.id, review.text, 'en')}
                          disabled={translations[review.id]?.loading}
                        >
                          {translations[review.id]?.loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : translations[review.id]?.translated && translations[review.id]?.targetLang === 'en' ? (
                            <>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Orijinal
                            </>
                          ) : (
                            <>
                              <Languages className="h-3 w-3 mr-1" />
                              EN
                            </>
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={() => translateComment(review.id, review.text, 'ru')}
                          disabled={translations[review.id]?.loading}
                        >
                          {translations[review.id]?.loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : translations[review.id]?.translated && translations[review.id]?.targetLang === 'ru' ? (
                            <>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Orijinal
                            </>
                          ) : (
                            <>
                              <Languages className="h-3 w-3 mr-1" />
                              RU
                            </>
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={() => translateComment(review.id, review.text, 'el')}
                          disabled={translations[review.id]?.loading}
                        >
                          {translations[review.id]?.loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : translations[review.id]?.translated && translations[review.id]?.targetLang === 'el' ? (
                            <>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Orijinal
                            </>
                          ) : (
                            <>
                              <Languages className="h-3 w-3 mr-1" />
                              EL
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {/* Çeviri Durumu Bilgisi */}
                      {translations[review.id]?.translated && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                          <Languages className="h-3 w-3 inline mr-1" />
                          {translations[review.id].targetLang === 'tr' && 'Türkçeye çevrildi'}
                          {translations[review.id].targetLang === 'en' && 'İngilizceye çevrildi'}
                          {translations[review.id].targetLang === 'ru' && 'Rusçaya çevrildi'}
                          {translations[review.id].targetLang === 'el' && 'Rumcaya çevrildi'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Yorum Sayısı Bilgisi */}
            {!loading && reviews.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Toplam {reviews.length} yorum gösteriliyor</p>
                <p className="text-xs mt-1">Yeni yorumlar otomatik olarak eklenir • Çeviri butonları ile yorumları anlayın</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Yorum Yap
            </h3>
            
            {/* Spam Alert - Sadece spam durumunda göster */}
            {spamAlert.show && (
              <div className="bg-red-100 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-400 rounded-lg p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                      🚨 Yorum Yayınlanamadı!
                    </h4>
                    <p className="text-red-700 dark:text-red-300 mb-3">
                      {spamAlert.message}
                    </p>
                    {spamAlert.reasons && spamAlert.reasons.length > 0 && (
                      <div className="bg-red-200 dark:bg-red-800/50 p-3 rounded-lg border border-red-300 dark:border-red-700">
                        <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                          🔍 Tespit Edilen Sorunlar:
                        </h5>
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          {spamAlert.reasons.map((reason, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 <strong>Not:</strong> Platformumuz çok dilli kullanıcıları destekler. 
                            Tüm dillerdeki uygunsuz içerikler filtrelenir.
                          </p>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setSpamAlert({ show: false, message: "" })}
                      className="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline"
                    >
                      Bu uyarıyı kapat
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("reviews.yourName")}
                </label>
                <input
                  type="text"
                  id="name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  placeholder="Adınızı girin"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("reviews.rating")}
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewComment({ ...newComment, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newComment.rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("reviews.yourComment")}
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  placeholder={t("reviews.commentPlaceholder")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Gönderiliyor...
                  </>
                ) : (
                  t("reviews.submit")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
