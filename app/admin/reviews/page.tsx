"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Trash2, Eye, EyeOff, Lock, User, Shield } from "lucide-react"
import { toast } from "sonner"

interface Review {
  id: string
  name: string
  text: string
  rating: number
  created_at: string
  approved: boolean
  isSpam?: boolean
  spamScore?: number
  spamReasons?: string[]
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'approved' | 'spam'>('all')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  // Basit admin giriş sistemi
  const handleLogin = () => {
    // Production'da environment variable kullanın
    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'jet-taxi-2024'
    
    if (credentials.username === adminUser && credentials.password === adminPass) {
      setIsAuthenticated(true)
      setShowLogin(false)
      toast.success('Admin paneline hoş geldiniz!')
      // Session storage'a kaydet
      sessionStorage.setItem('adminAuth', 'true')
    } else {
      toast.error('Hatalı kullanıcı adı veya şifre!')
    }
  }

  // Sayfa yüklendiğinde session kontrolü
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setShowLogin(false)
    }
  }, [])

  // Çıkış yap
  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLogin(true)
    sessionStorage.removeItem('adminAuth')
    toast.success('Çıkış yapıldı')
  }

  // Yorumları getir
  useEffect(() => {
    if (!isAuthenticated) return
    
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews?all=true')
        const data = await response.json()
        if (data.reviews) {
          setReviews(data.reviews)
        }
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error)
        toast.error('Yorumlar yüklenemedi')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [isAuthenticated])

  // Yorum sil
  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== id))
        toast.success('Yorum silindi')
      } else {
        toast.error('Yorum silinemedi')
      }
    } catch (error) {
      console.error('Yorum silinirken hata:', error)
      toast.error('Yorum silinemedi')
    }
  }

  // Filtreleme
  const filteredReviews = reviews.filter(review => {
    if (filter === 'approved') return review.approved
    if (filter === 'spam') return review.isSpam
    return true
  })

  // İstatistikler
  const totalReviews = reviews.length
  const approvedReviews = reviews.filter(r => r.approved).length
  const spamReviews = reviews.filter(r => r.isSpam).length
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  // Admin giriş ekranı
  if (showLogin || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
            <p className="text-gray-600">JET-TAXI Yorum Yönetimi</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Şifre
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              <Shield className="w-5 h-5 mr-2" />
              Giriş Yap
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Varsayılan: admin / jet-taxi-2024
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-blue-600" />
                Admin Paneli
              </h1>
              <p className="text-gray-600 mt-2">JET-TAXI Yorum Yönetimi ve İstatistikleri</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Lock className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
              <div className="text-sm text-blue-600">Toplam Yorum</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{approvedReviews}</div>
              <div className="text-sm text-green-600">Onaylanan</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{spamReviews}</div>
              <div className="text-sm text-red-600">Spam</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{averageRating}</div>
              <div className="text-sm text-yellow-600">Ortalama Puan</div>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tümü ({totalReviews})
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilter('approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              Onaylanan ({approvedReviews})
            </Button>
            <Button
              variant={filter === 'spam' ? 'default' : 'outline'}
              onClick={() => setFilter('spam')}
              className="bg-red-600 hover:bg-red-700"
            >
              Spam ({spamReviews})
            </Button>
          </div>
        </div>

        {/* Yorumlar Listesi */}
        <div className="bg-white rounded-lg shadow-sm border">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Yorumlar yükleniyor...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Bu filtrede yorum bulunamadı.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Spam İndikatörü */}
                      {review.isSpam && (
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Spam
                        </div>
                      )}
                      
                      {/* Onay Durumu */}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        review.approved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.approved ? '✓ Onaylı' : '⏳ Bekliyor'}
                      </div>
                      
                      {/* Puan */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Yorum Metni */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>

                  {/* Spam Detayları */}
                  {review.isSpam && review.spamReasons && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                        <EyeOff className="w-4 h-4" />
                        Spam Sebepleri (Skor: {review.spamScore})
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {review.spamReasons.map((reason, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Aksiyonlar */}
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => deleteReview(review.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
