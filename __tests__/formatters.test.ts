import { 
  formatCurrency, 
  formatDate, 
  formatNumber, 
  isRTLLanguage,
  getCurrencySymbol 
} from '@/lib/formatters'

describe('Formatters Utility', () => {
  describe('formatCurrency', () => {
    it('should format Turkish Lira correctly', () => {
      const result = formatCurrency(100, 'TRY', 'tr-TR')
      expect(result).toContain('₺')
      expect(result).toContain('100')
    })

    it('should format Euro correctly', () => {
      const result = formatCurrency(50, 'EUR', 'en-US')
      expect(result).toContain('€')
      expect(result).toContain('50')
    })

    it('should handle invalid currency gracefully', () => {
      const result = formatCurrency(100, 'INVALID', 'tr-TR')
      expect(result).toBe('100.00 INVALID')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const testDate = new Date('2024-01-15')
      const result = formatDate(testDate, 'tr-TR')
      expect(result).toContain('2024')
      expect(result).toContain('15')
    })

    it('should handle string dates', () => {
      const result = formatDate('2024-01-15', 'tr-TR')
      expect(result).toContain('2024')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      const result = formatNumber(1234.56, 'tr-TR')
      expect(result).toContain('1.234,56')
    })

    it('should handle integers', () => {
      const result = formatNumber(1000, 'en-US')
      expect(result).toBe('1,000')
    })
  })

  describe('isRTLLanguage', () => {
    it('should detect RTL languages correctly', () => {
      expect(isRTLLanguage('ar')).toBe(true)
      expect(isRTLLanguage('he')).toBe(true)
      expect(isRTLLanguage('fa')).toBe(true)
    })

    it('should detect LTR languages correctly', () => {
      expect(isRTLLanguage('tr')).toBe(false)
      expect(isRTLLanguage('en')).toBe(false)
      expect(isRTLLanguage('ru')).toBe(false)
    })
  })

  describe('getCurrencySymbol', () => {
    it('should return correct currency symbols', () => {
      expect(getCurrencySymbol('TRY')).toBe('₺')
      expect(getCurrencySymbol('EUR')).toBe('€')
      expect(getCurrencySymbol('USD')).toBe('$')
    })

    it('should return currency code for unknown currencies', () => {
      expect(getCurrencySymbol('UNKNOWN')).toBe('UNKNOWN')
    })
  })
})
