import { sdk } from "@lib/config"

/**
 * Wrapper for Medusa SDK that handles connection failures gracefully
 */
export class SafeMedusaClient {
  private static isBackendAvailable = true

  /**
   * Check if the backend is available
   */
  static async checkBackendHealth(): Promise<boolean> {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}/store/regions`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })
      this.isBackendAvailable = true
      return true
    } catch (error) {
      console.warn('Backend is not available, using mock data:', error instanceof Error ? error.message : 'Unknown error')
      this.isBackendAvailable = false
      return false
    }
  }

  /**
   * Safe fetch wrapper that returns mock data when backend is unavailable
   */
  static async safeFetch<T>(
    fetchFn: () => Promise<T>,
    mockData: T,
    errorMessage: string = 'Failed to fetch data'
  ): Promise<T> {
    if (!this.isBackendAvailable) {
      console.warn(`${errorMessage}: Backend unavailable, using mock data`)
      return mockData
    }

    try {
      return await fetchFn()
    } catch (error) {
      console.warn(`${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      this.isBackendAvailable = false
      return mockData
    }
  }

  /**
   * Get products with fallback to mock data
   */
  static async getProducts(params: any) {
    const mockProducts = {
      response: { products: [], count: 0 },
      nextPage: null,
    }

    return this.safeFetch(
      () => sdk.client.fetch('/store/products', params),
      mockProducts,
      'Failed to fetch products'
    )
  }

  /**
   * Get regions with fallback to mock data
   */
  static async getRegions() {
    const mockRegions = {
      regions: [
        {
          id: "default",
          name: "United States",
          countries: [{ iso_2: "us", name: "United States" }],
        }
      ]
    }

    return this.safeFetch(
      () => sdk.client.fetch('/store/regions'),
      mockRegions,
      'Failed to fetch regions'
    )
  }

  /**
   * Get collections with fallback to mock data
   */
  static async getCollections(params: any) {
    const mockCollections = {
      collections: []
    }

    return this.safeFetch(
      () => sdk.client.fetch('/store/collections', params),
      mockCollections,
      'Failed to fetch collections'
    )
  }

  /**
   * Get categories with fallback to mock data
   */
  static async getCategories() {
    const mockCategories = []

    return this.safeFetch(
      () => sdk.client.fetch('/store/product-categories'),
      mockCategories,
      'Failed to fetch categories'
    )
  }
}
