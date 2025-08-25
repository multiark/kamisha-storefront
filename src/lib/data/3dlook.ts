"use client"

import { HttpTypes } from "@medusajs/types"
import { THREEDLOOK_CONFIG } from "@lib/config/3dlook"

// 3DLOOK API configuration
const API_CONFIG = {
  apiKey: THREEDLOOK_CONFIG.apiKey,
  baseUrl: THREEDLOOK_CONFIG.baseUrl,
}

// Types for 3DLOOK API
export type ThreeDLookTryOnSession = {
  sessionId: string
  status: 'created' | 'processing' | 'completed' | 'failed'
  productId: string
  variantId: string
  createdAt: string
  expiresAt: string
}

export type ThreeDLookSizeRecommendation = {
  recommendedSize: string
  confidence: number
  alternativeSizes: string[]
  fitNotes: string[]
  measurements: {
    chest: number
    waist: number
    hips: number
    height: number
    weight: number
  }
}

export type ThreeDLookBodyMeasurements = {
  height: number
  weight: number
  chest: number
  waist: number
  hips: number
  inseam: number
  shoulders: number
  age: number
  gender: 'male' | 'female' | 'other'
}

export type ThreeDLookTryOnRequest = {
  productId: string
  variantId: string
  userImage: string // base64 encoded image
  measurements?: ThreeDLookBodyMeasurements
}

export type ThreeDLookSizeRequest = {
  productId: string
  variantId?: string
  measurements: ThreeDLookBodyMeasurements
  preferences?: {
    fitStyle: 'slim' | 'regular' | 'loose'
    comfortLevel: 'tight' | 'comfortable' | 'loose'
  }
}

class ThreeDLookService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = API_CONFIG.apiKey
    this.baseUrl = API_CONFIG.baseUrl
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      throw new Error('3DLOOK API key not configured')
    }

    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`3DLOOK API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('3DLOOK API request failed:', error)
      throw error
    }
  }

  /**
   * Create a virtual try-on session
   */
  async createTryOnSession(request: ThreeDLookTryOnRequest): Promise<ThreeDLookTryOnSession> {
    try {
      const response = await this.makeRequest(THREEDLOOK_CONFIG.endpoints.tryOn, {
        method: 'POST',
        body: JSON.stringify(request),
      })

      return response
    } catch (error) {
      console.error('Failed to create try-on session:', error)
      throw error
    }
  }

  /**
   * Get size recommendation based on body measurements
   */
  async getSizeRecommendation(request: ThreeDLookSizeRequest): Promise<ThreeDLookSizeRecommendation> {
    try {
      const response = await this.makeRequest(THREEDLOOK_CONFIG.endpoints.sizing, {
        method: 'POST',
        body: JSON.stringify(request),
      })

      return response
    } catch (error) {
      console.error('Failed to get size recommendation:', error)
      throw error
    }
  }

  /**
   * Process virtual try-on with user image
   */
  async processTryOn(sessionId: string, userImage: string): Promise<{ resultImage: string; confidence: number }> {
    try {
      const response = await this.makeRequest(`${THREEDLOOK_CONFIG.endpoints.tryOn}/${sessionId}/process`, {
        method: 'POST',
        body: JSON.stringify({ userImage }),
      })

      return response
    } catch (error) {
      console.error('Failed to process try-on:', error)
      throw error
    }
  }

  /**
   * Get try-on session status
   */
  async getTryOnSessionStatus(sessionId: string): Promise<ThreeDLookTryOnSession> {
    try {
      const response = await this.makeRequest(`${THREEDLOOK_CONFIG.endpoints.tryOn}/${sessionId}`)
      return response
    } catch (error) {
      console.error('Failed to get try-on session status:', error)
      throw error
    }
  }

  /**
   * Extract body measurements from photo
   */
  async extractMeasurements(imageData: string): Promise<ThreeDLookBodyMeasurements> {
    try {
      const response = await this.makeRequest(THREEDLOOK_CONFIG.endpoints.measurements, {
        method: 'POST',
        body: JSON.stringify({ image: imageData }),
      })

      return response.measurements
    } catch (error) {
      console.error('Failed to extract measurements:', error)
      throw error
    }
  }

  /**
   * Get product size chart
   */
  async getProductSizeChart(productId: string): Promise<any> {
    try {
      const response = await this.makeRequest(`${THREEDLOOK_CONFIG.endpoints.sizeChart}/${productId}/size-chart`)
      return response
    } catch (error) {
      console.error('Failed to get product size chart:', error)
      throw error
    }
  }

  /**
   * Check if service is available
   */
  async checkServiceHealth(): Promise<boolean> {
    try {
      await this.makeRequest(THREEDLOOK_CONFIG.endpoints.health)
      return true
    } catch (error) {
      console.error('3DLOOK service health check failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const threeDLookService = new ThreeDLookService()

// Export for direct usage
export default ThreeDLookService
