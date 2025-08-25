"use client"

import { HttpTypes } from "@medusajs/types"

// Zakeke API configuration
const ZAKEKE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_ZAKEKE_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_ZAKEKE_API_URL || 'https://api.zakeke.com/v2',
  tenantId: process.env.NEXT_PUBLIC_ZAKEKE_TENANT_ID || '',
}

// Types for Zakeke API
export type ZakekeTryOnSession = {
  sessionId: string
  status: 'created' | 'processing' | 'completed' | 'failed'
  productId: string
  variantId: string
  createdAt: string
  expiresAt: string
}

export type ZakekeSizeRecommendation = {
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

export type ZakekeBodyMeasurements = {
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

export type ZakekeTryOnRequest = {
  productId: string
  variantId: string
  userImage: string // base64 encoded image
  measurements?: ZakekeBodyMeasurements
}

export type ZakekeSizeRequest = {
  productId: string
  variantId?: string
  measurements: ZakekeBodyMeasurements
  preferences?: {
    fitStyle: 'slim' | 'regular' | 'loose'
    comfortLevel: 'tight' | 'comfortable' | 'loose'
  }
}

class ZakekeService {
  private apiKey: string
  private baseUrl: string
  private tenantId: string

  constructor() {
    this.apiKey = ZAKEKE_CONFIG.apiKey
    this.baseUrl = ZAKEKE_CONFIG.baseUrl
    this.tenantId = ZAKEKE_CONFIG.tenantId
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.apiKey) {
      throw new Error('Zakeke API key not configured')
    }

    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Tenant-ID': this.tenantId,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`Zakeke API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Zakeke API request failed:', error)
      throw error
    }
  }

  /**
   * Create a virtual try-on session
   */
  async createTryOnSession(request: ZakekeTryOnRequest): Promise<ZakekeTryOnSession> {
    try {
      const response = await this.makeRequest('/try-on/sessions', {
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
  async getSizeRecommendation(request: ZakekeSizeRequest): Promise<ZakekeSizeRecommendation> {
    try {
      const response = await this.makeRequest('/sizing/recommendations', {
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
      const response = await this.makeRequest(`/try-on/sessions/${sessionId}/process`, {
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
  async getTryOnSessionStatus(sessionId: string): Promise<ZakekeTryOnSession> {
    try {
      const response = await this.makeRequest(`/try-on/sessions/${sessionId}`)
      return response
    } catch (error) {
      console.error('Failed to get try-on session status:', error)
      throw error
    }
  }

  /**
   * Extract body measurements from photo
   */
  async extractMeasurements(imageData: string): Promise<ZakekeBodyMeasurements> {
    try {
      const response = await this.makeRequest('/measurements/extract', {
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
      const response = await this.makeRequest(`/products/${productId}/size-chart`)
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
      await this.makeRequest('/health')
      return true
    } catch (error) {
      console.error('Zakeke service health check failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const zakekeService = new ZakekeService()

// Export for direct usage
export default ZakekeService
