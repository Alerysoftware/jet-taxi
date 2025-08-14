interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
    timeToInteractive: 0
  }

  constructor() {
    this.init()
  }

  private init() {
    if (typeof window !== 'undefined') {
      this.observePageLoad()
      this.observePaintMetrics()
      this.observeLayoutShift()
      this.observeInputDelay()
    }
  }

  private observePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.navigationStart
        this.logMetric('Page Load Time', this.metrics.pageLoadTime)
      }
    })
  }

  private observePaintMetrics() {
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime
            this.logMetric('First Contentful Paint', entry.startTime)
          }
        }
      })
      paintObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.largestContentfulPaint = entry.startTime
          this.logMetric('Largest Contentful Paint', entry.startTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }

  private observeLayoutShift() {
    if ('PerformanceObserver' in window) {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        let cumulativeLayoutShift = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cumulativeLayoutShift += (entry as any).value
          }
        }
        this.metrics.cumulativeLayoutShift = cumulativeLayoutShift
        this.logMetric('Cumulative Layout Shift', cumulativeLayoutShift)
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  private observeInputDelay() {
    if ('PerformanceObserver' in window) {
      const inputObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime
          this.logMetric('First Input Delay', this.metrics.firstInputDelay)
          break // Only measure first input
        }
      })
      inputObserver.observe({ entryTypes: ['first-input'] })
    }
  }

  private logMetric(name: string, value: number) {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms`)
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_location: window.location.href
      })
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  // Measure custom operations
  measureOperation<T>(name: string, operation: () => T | Promise<T>): T | Promise<T> {
    const start = performance.now()
    
    if (operation instanceof Promise) {
      return operation.then((result) => {
        const duration = performance.now() - start
        this.logMetric(`${name} Duration`, duration)
        return result
      })
    } else {
      const result = operation()
      const duration = performance.now() - start
      this.logMetric(`${name} Duration`, duration)
      return result
    }
  }

  // Report performance issues
  reportPerformanceIssue(metric: keyof PerformanceMetrics, threshold: number) {
    const value = this.metrics[metric]
    if (value > threshold) {
      console.warn(`⚠️ Performance issue detected: ${metric} = ${value}ms (threshold: ${threshold}ms)`)
      
      // Send to error tracking service
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance_issue', {
          metric_name: metric,
          metric_value: value,
          threshold: threshold,
          page_location: window.location.href
        })
      }
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Convenience functions
export const measureOperation = <T>(name: string, operation: () => T | Promise<T>) => 
  performanceMonitor.measureOperation(name, operation)

export const getPerformanceMetrics = () => performanceMonitor.getMetrics()

export default PerformanceMonitor
