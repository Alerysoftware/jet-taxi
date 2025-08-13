'use client'

import { WifiOff, RefreshCw, Home, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleCall = () => {
    window.location.href = 'tel:+905338806808'
  }

  if (isOnline) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            İnternet Bağlantısı Kuruldu!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Artık Jet Taxi hizmetlerimizi kullanabilirsiniz.
          </p>

          <Button onClick={handleGoHome} className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Ana Sayfaya Git
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <WifiOff className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          İnternet Bağlantısı Yok
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Şu anda çevrimdışı moddasınız. Jet Taxi hizmetlerimizi kullanmak için internet bağlantınızı kontrol edin.
        </p>

        <div className="space-y-3">
          <Button onClick={handleRefresh} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tekrar Dene
          </Button>
          
          <Button onClick={handleGoHome} className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Ana Sayfa
          </Button>
          
          <Button onClick={handleCall} variant="secondary" className="w-full">
            <Phone className="w-4 h-4 mr-2" />
            Bizi Arayın: 0533 880 68 08
          </Button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            🚗 Jet Taxi Hizmetleri
          </h3>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
            <li>• Havalimanı Transferi</li>
            <li>• Şehir İçi Taksiler</li>
            <li>• VIP Hizmetler</li>
            <li>• 7/24 Hizmet</li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Çevrimdışı modda bile size yardımcı olmaya çalışıyoruz!</p>
          <p className="mt-1">Telefon: +90 533 880 68 08</p>
        </div>
      </div>
    </div>
  )
}
