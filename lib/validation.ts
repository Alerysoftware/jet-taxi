import { z } from 'zod'

// Review validation schema
export const reviewSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olmalıdır')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harf içermelidir'),
  
  text: z.string()
    .min(10, 'Yorum en az 10 karakter olmalıdır')
    .max(500, 'Yorum en fazla 500 karakter olmalıdır')
    .refine((text) => {
      // Spam kontrolü
      const spamPatterns = [
        /https?:\/\/|www\.|\.com|\.net|\.org/i, // Link kontrolü
        /[A-ZĞÜŞİÖÇ]{10,}/, // Çok fazla büyük harf
        /[0-9]{5,}/, // Çok fazla sayı
        /(.)\1{5,}/, // Tekrar eden karakterler
      ]
      
      return !spamPatterns.some(pattern => pattern.test(text))
    }, 'Yorum spam içerik tespit edildi'),
  
  rating: z.number()
    .min(1, 'Puan en az 1 olmalıdır')
    .max(5, 'Puan en fazla 5 olmalıdır')
    .int('Puan tam sayı olmalıdır')
})

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olmalıdır'),
  
  email: z.string()
    .email('Geçerli bir email adresi giriniz'),
  
  message: z.string()
    .min(10, 'Mesaj en az 10 karakter olmalıdır')
    .max(1000, 'Mesaj en fazla 1000 karakter olmalıdır'),
  
  phone: z.string()
    .optional()
    .refine((phone) => {
      if (!phone) return true
      return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone)
    }, 'Geçerli bir telefon numarası giriniz')
})

// Translation validation schema
export const translationSchema = z.object({
  text: z.string()
    .min(1, 'Çevrilecek metin gerekli')
    .max(1000, 'Metin çok uzun'),
  
  targetLang: z.enum(['tr', 'en', 'ru', 'el'], {
    errorMap: () => ({ message: 'Geçersiz hedef dil' })
  })
})

// Admin login validation schema
export const adminLoginSchema = z.object({
  username: z.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
    .max(50, 'Kullanıcı adı en fazla 50 karakter olmalıdır'),
  
  password: z.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .max(100, 'Şifre çok uzun')
})

// Sanitization functions
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // HTML tag'leri kaldır
    .replace(/javascript:/gi, '') // JavaScript protokolü kaldır
    .replace(/on\w+=/gi, '') // Event handler'ları kaldır
}

export function sanitizeHTML(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// CSRF token validation
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false
  return token === sessionToken
}

// Rate limiting helper
export function isRateLimited(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const key = `rate_limit_${identifier}`
  
  // Bu basit bir implementasyon, production'da Redis kullanın
  const data = globalThis.rateLimitStore?.get(key)
  
  if (data && now < data.resetTime) {
    if (data.count >= limit) return true
    data.count++
  } else {
    globalThis.rateLimitStore?.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
  }
  
  return false
}

// Export types
export type ReviewInput = z.infer<typeof reviewSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type TranslationInput = z.infer<typeof translationSchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
