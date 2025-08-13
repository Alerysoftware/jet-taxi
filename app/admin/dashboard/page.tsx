'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Car, 
  Star, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react'
import { useReviews } from '@/hooks/use-reviews'

interface DashboardStats {
  totalCustomers: number
  totalBookings: number
  totalRevenue: number
  averageRating: number
  monthlyGrowth: number
  topServices: Array<{ name: string; count: number; revenue: number }>
  recentBookings: Array<{
    id: string
    customerName: string
    serviceType: string
    amount: number
    status: string
    date: string
  }>
}

export default function AdminDashboard() {
  const { reviews } = useReviews()
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    monthlyGrowth: 0,
    topServices: [],
    recentBookings: []
  })

  useEffect(() => {
    // Simulated data - production'da API'den çekin
    setStats({
      totalCustomers: reviews.length + 150,
      totalBookings: 89,
      totalRevenue: 12500,
      averageRating: reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 4.8,
      monthlyGrowth: 12.5,
      topServices: [
        { name: 'Havalimanı Transferi', count: 45, revenue: 6750 },
        { name: 'Şehir İçi', count: 28, revenue: 4200 },
        { name: 'VIP Hizmet', count: 16, revenue: 1550 }
      ],
      recentBookings: [
        {
          id: 'JT-001',
          customerName: 'Ahmet Yılmaz',
          serviceType: 'Havalimanı',
          amount: 150,
          status: 'completed',
          date: '2024-01-15'
        },
        {
          id: 'JT-002',
          customerName: 'Maria Garcia',
          serviceType: 'Şehir İçi',
          amount: 25,
          status: 'active',
          date: '2024-01-15'
        }
      ]
    })
  }, [reviews])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Jet Taxi işletme istatistikleri ve yönetim paneli
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Yeni Rezervasyon
          </Button>
        </div>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Rezervasyon</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              Bu ay tamamlanan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Puan</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {reviews.length} değerlendirme
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detaylı Analiz */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="services">Hizmet Analizi</TabsTrigger>
          <TabsTrigger value="bookings">Rezervasyonlar</TabsTrigger>
          <TabsTrigger value="customers">Müşteri İçgörüleri</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hizmet Dağılımı */}
            <Card>
              <CardHeader>
                <CardTitle>Hizmet Dağılımı</CardTitle>
                <CardDescription>En popüler hizmetler ve gelirleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-sm font-medium">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{service.count} rezervasyon</div>
                        <div className="text-xs text-muted-foreground">€{service.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Son Aktiviteler */}
            <Card>
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
                <CardDescription>Son rezervasyonlar ve durumları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-muted-foreground">{booking.serviceType}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">€{booking.amount}</div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hizmet Performans Analizi</CardTitle>
              <CardDescription>Detaylı hizmet istatistikleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.count} rezervasyon
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{service.revenue}</div>
                      <div className="text-sm text-muted-foreground">
                        Ortalama: €{(service.revenue / service.count).toFixed(0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rezervasyon Yönetimi</CardTitle>
              <CardDescription>Tüm rezervasyonları görüntüle ve yönet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.id} • {booking.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-medium">€{booking.amount}</div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Detay
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri İçgörüleri</CardTitle>
              <CardDescription>Müşteri davranışları ve tercihleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Müşteri Memnuniyeti</h4>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">/ 5.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reviews.length} müşteri değerlendirmesi
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Popüler Hizmetler</h4>
                  <div className="space-y-2">
                    {stats.topServices.slice(0, 3).map((service, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-medium">{service.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
