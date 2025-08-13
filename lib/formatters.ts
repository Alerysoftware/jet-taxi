// Internationalization formatters for Jet Taxi

// Para birimi formatı
export function formatCurrency(
  amount: number,
  currency: string = 'TRY',
  locale: string = 'tr-TR'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback format
    return `${amount.toFixed(2)} ${currency}`
  }
}

// Tarih formatı
export function formatDate(
  date: Date | string,
  locale: string = 'tr-TR',
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj)
  } catch (error) {
    // Fallback format
    return new Date(date).toLocaleDateString()
  }
}

// Saat formatı
export function formatTime(
  date: Date | string,
  locale: string = 'tr-TR',
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    }
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj)
  } catch (error) {
    // Fallback format
    return new Date(date).toLocaleTimeString()
  }
}

// Sayı formatı
export function formatNumber(
  number: number,
  locale: string = 'tr-TR',
  options?: Intl.NumberFormatOptions
): string {
  try {
    const defaultOptions: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }
    
    return new Intl.NumberFormat(locale, defaultOptions).format(number)
  } catch (error) {
    // Fallback format
    return number.toString()
  }
}

// Mesafe formatı (km)
export function formatDistance(
  distance: number,
  locale: string = 'tr-TR',
  unit: 'km' | 'mi' = 'km'
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'unit',
      unit: unit,
      unitDisplay: 'short',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
    
    return formatter.format(distance)
  } catch (error) {
    // Fallback format
    return `${distance.toFixed(1)} ${unit}`
  }
}

// Telefon numarası formatı
export function formatPhoneNumber(
  phone: string,
  locale: string = 'tr-TR'
): string {
  try {
    // Türkiye telefon numarası formatı
    if (locale.startsWith('tr')) {
      const cleaned = phone.replace(/\D/g, '')
      if (cleaned.length === 11 && cleaned.startsWith('90')) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`
      } else if (cleaned.length === 10 && cleaned.startsWith('5')) {
        return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`
      }
    }
    
    // Genel format
    return phone
  } catch (error) {
    return phone
  }
}

// Adres formatı
export function formatAddress(
  address: {
    street?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  },
  locale: string = 'tr-TR'
): string {
  try {
    const parts = []
    
    if (address.street) parts.push(address.street)
    if (address.city) parts.push(address.city)
    if (address.state) parts.push(address.state)
    if (address.postalCode) parts.push(address.postalCode)
    if (address.country) parts.push(address.country)
    
    return parts.join(', ')
  } catch (error) {
    return Object.values(address).filter(Boolean).join(', ')
  }
}

// RTL dil desteği
export function isRTLLanguage(locale: string): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'sd']
  return rtlLanguages.some(lang => locale.startsWith(lang))
}

// Dil adı formatı
export function formatLanguageName(locale: string, targetLocale: string = 'tr'): string {
  try {
    return new Intl.DisplayNames([targetLocale], { type: 'language' }).of(locale) || locale
  } catch (error) {
    const languageNames: Record<string, string> = {
      'tr': 'Türkçe',
      'en': 'English',
      'ru': 'Русский',
      'el': 'Ελληνικά',
      'ar': 'العربية',
    }
    return languageNames[locale] || locale
  }
}

// Ülke adı formatı
export function formatCountryName(countryCode: string, locale: string = 'tr'): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(countryCode) || countryCode
  } catch (error) {
    const countryNames: Record<string, string> = {
      'TR': 'Türkiye',
      'CY': 'Kıbrıs',
      'US': 'Amerika Birleşik Devletleri',
      'GB': 'Birleşik Krallık',
      'DE': 'Almanya',
    }
    return countryNames[countryCode] || countryCode
  }
}

// Para birimi sembolü
export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    'TRY': '₺',
    'EUR': '€',
    'USD': '$',
    'GBP': '£',
    'RUB': '₽',
  }
  return symbols[currency] || currency
}

// Saat dilimi formatı
export function formatTimezone(
  date: Date,
  locale: string = 'tr-TR',
  timeZone: string = 'Europe/Istanbul'
): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date)
  } catch (error) {
    return date.toLocaleString(locale, { timeZone })
  }
}
