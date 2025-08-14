interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.store[identifier]

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.config.windowMs
      }
      return true
    }

    if (record.count >= this.config.maxRequests) {
      return false
    }

    record.count++
    return true
  }

  getRemaining(identifier: string): number {
    const record = this.store[identifier]
    if (!record) return this.config.maxRequests
    return Math.max(0, this.config.maxRequests - record.count)
  }

  getResetTime(identifier: string): number {
    const record = this.store[identifier]
    return record ? record.resetTime : Date.now()
  }

  // Clean up expired records
  cleanup(): void {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key]
      }
    })
  }
}

// Global rate limiter instances
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes
})

export const reviewRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5 // 5 reviews per hour
})

export const bookingRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10 // 10 bookings per hour
})

// Clean up expired records every hour
setInterval(() => {
  apiRateLimiter.cleanup()
  reviewRateLimiter.cleanup()
  bookingRateLimiter.cleanup()
}, 60 * 60 * 1000)

export default RateLimiter
