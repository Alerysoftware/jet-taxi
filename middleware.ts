import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting için basit in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting konfigürasyonu
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 dakika
const MAX_REQUESTS_PER_WINDOW = 100 // 1 dakikada maksimum 100 istek

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Security headers ekle
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-DNS-Prefetch-Control', 'off')
  response.headers.set('X-Download-Options', 'noopen')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // API endpoint'leri için rate limiting
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    // Rate limit kontrolü
    const clientData = rateLimitStore.get(clientIP)
    
    if (clientData && now < clientData.resetTime) {
      if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
        return new NextResponse(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60'
            }
          }
        )
      }
      clientData.count++
    } else {
      rateLimitStore.set(clientIP, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      })
    }
  }
  
  // Admin paneli için IP kısıtlaması (opsiyonel)
  if (request.nextUrl.pathname.startsWith('/admin/')) {
    // Sadece belirli IP'lerden erişime izin ver
    const allowedIPs = ['127.0.0.1', '::1'] // Localhost
    const clientIP = request.ip || request.headers.get('x-forwarded-for')
    
    if (clientIP && !allowedIPs.includes(clientIP)) {
      return new NextResponse(
        JSON.stringify({ error: 'Access denied' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
