import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { z } from 'zod'
import { bookingRateLimiter } from '@/lib/rate-limiter'

// Rezervasyon validation schema
const bookingSchema = z.object({
  customerName: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim çok uzun'),
  customerPhone: z.string().min(10, 'Telefon numarası geçerli değil'),
  customerEmail: z.string().email('Geçerli email adresi giriniz').optional(),
  pickupLocation: z.string().min(5, 'Alış noktası en az 5 karakter olmalıdır'),
  dropoffLocation: z.string().min(5, 'Bırakış noktası en az 5 karakter olmalıdır'),
  pickupDate: z.string().min(1, 'Alış tarihi gerekli'),
  pickupTime: z.string().min(1, 'Alış saati gerekli'),
  passengers: z.number().min(1, 'En az 1 yolcu olmalıdır').max(8, 'Maksimum 8 yolcu'),
  luggage: z.number().min(0, 'Bagaj sayısı negatif olamaz').max(10, 'Maksimum 10 bagaj'),
  serviceType: z.enum(['airport', 'city', 'intercity', 'vip'], {
    errorMap: () => ({ message: 'Geçersiz hizmet türü' })
  }),
  specialRequests: z.string().max(500, 'Özel istekler çok uzun').optional(),
  estimatedPrice: z.number().min(0, 'Fiyat negatif olamaz').optional(),
})

// Fiyat hesaplama motoru
function calculatePrice(
  serviceType: string,
  distance: number,
  passengers: number,
  luggage: number,
  isVip: boolean = false
): number {
  let basePrice = 0
  
  // Hizmet türüne göre base price
  switch (serviceType) {
    case 'airport':
      basePrice = 50 // €50 base
      break
    case 'city':
      basePrice = 15 // €15 base
      break
    case 'intercity':
      basePrice = 30 // €30 base
      break
    case 'vip':
      basePrice = 80 // €80 base
      break
    default:
      basePrice = 20
  }
  
  // Mesafe hesaplama (km başına)
  const distancePrice = distance * 0.8 // €0.80/km
  
  // Yolcu sayısı (ekstra yolcu başına)
  const passengerPrice = Math.max(0, passengers - 1) * 5 // €5/ekstra yolcu
  
  // Bagaj (ekstra bagaj başına)
  const luggagePrice = Math.max(0, luggage - 2) * 3 // €3/ekstra bagaj
  
  // VIP hizmet
  const vipMultiplier = isVip ? 1.5 : 1
  
  const totalPrice = (basePrice + distancePrice + passengerPrice + luggagePrice) * vipMultiplier
  
  return Math.round(totalPrice * 100) / 100 // 2 ondalık basamak
}

// Mesafe hesaplama (basit Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Dünya'nın yarıçapı (km)
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// POST: Yeni rezervasyon oluştur
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    if (!bookingRateLimiter.isAllowed(clientIP)) {
      const remaining = bookingRateLimiter.getRemaining(clientIP)
      const resetTime = bookingRateLimiter.getResetTime(clientIP)
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Rate limit exceeded',
          message: 'Çok fazla rezervasyon yapmaya çalıştınız. Lütfen daha sonra tekrar deneyin.',
          remaining,
          resetTime: new Date(resetTime).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': resetTime.toString(),
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const body = await request.json()
    
    // Validation
    const validatedData = bookingSchema.parse(body)
    
    // Mesafe hesaplama (örnek koordinatlar - gerçek uygulamada geocoding API kullanın)
    const distance = calculateDistance(35.3411, 33.9197, 35.3411, 33.9197) // Örnek
    
    // Fiyat hesaplama
    const estimatedPrice = calculatePrice(
      validatedData.serviceType,
      distance,
      validatedData.passengers,
      validatedData.luggage,
      validatedData.serviceType === 'vip'
    )
    
    // Rezervasyon oluştur
    const bookingData = {
      ...validatedData,
      estimatedPrice,
      distance: Math.round(distance * 100) / 100,
      status: 'pending', // pending, confirmed, completed, cancelled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      bookingId: `JT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      driverAssigned: false,
      driverId: null,
      actualPrice: null,
      completedAt: null,
      customerRating: null,
      customerFeedback: null,
    }
    
    const docRef = await addDoc(collection(db, 'bookings'), bookingData)
    
    // SMS/Email bildirimi (production'da implement edin)
    // await sendBookingConfirmation(validatedData.customerPhone, validatedData.customerEmail, bookingData)
    
    return NextResponse.json({
      success: true,
      message: 'Rezervasyon başarıyla oluşturuldu!',
      bookingId: bookingData.bookingId,
      estimatedPrice,
      estimatedPickupTime: `${validatedData.pickupDate} ${validatedData.pickupTime}`,
      nextSteps: [
        'Rezervasyonunuz onaylandıktan sonra size SMS ile bilgi verilecek',
        'Şoförünüz belirlendiğinde size iletişim bilgileri iletilecek',
        'Ödeme nakit veya kart ile yapılabilir'
      ]
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error', 
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Booking error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    )
  }
}

// GET: Rezervasyonları listele (admin için)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const customerPhone = searchParams.get('phone')
    
    let q = collection(db, 'bookings')
    
    if (status) {
      q = query(q, where('status', '==', status))
    }
    
    if (customerPhone) {
      q = query(q, where('customerPhone', '==', customerPhone))
    }
    
    const querySnapshot = await getDocs(q)
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ 
      success: true, 
      bookings,
      total: bookings.length
    })
    
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Rezervasyonlar yüklenemedi' 
      },
      { status: 500 }
    )
  }
}
