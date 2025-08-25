// Zakeke configuration
export const ZAKEKE_CONFIG = {
  // API Configuration
  apiKey: process.env.NEXT_PUBLIC_ZAKEKE_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_ZAKEKE_API_URL || 'https://api.zakeke.com/v2',
  tenantId: process.env.NEXT_PUBLIC_ZAKEKE_TENANT_ID || '',
  
  // Feature flags
  features: {
    virtualTryOn: true,
    sizeRecommendation: true,
    measurementExtraction: true,
    sizeChart: true,
  },
  
  // UI Configuration
  ui: {
    showSizeChart: true,
    showMeasurementForm: true,
    showVirtualTryOn: true,
    showSizeRecommendation: true,
  },
  
  // API Endpoints
  endpoints: {
    tryOn: '/try-on/sessions',
    sizing: '/sizing/recommendations',
    measurements: '/measurements/extract',
    sizeChart: '/products',
    health: '/health',
  },
  
  // Default settings
  defaults: {
    maxImageSize: 10 * 1024 * 1024, // 10MB
    supportedImageFormats: ['image/jpeg', 'image/png', 'image/webp'],
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxRetries: 3,
  },
}

// Validation function
export const validateZakekeConfig = () => {
  const errors: string[] = []
  
  if (!ZAKEKE_CONFIG.apiKey) {
    errors.push('Zakeke API key is required')
  }
  
  if (!ZAKEKE_CONFIG.tenantId) {
    errors.push('Zakeke tenant ID is required')
  }
  
  if (!ZAKEKE_CONFIG.baseUrl) {
    errors.push('Zakeke API base URL is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Get configuration for specific feature
export const getFeatureConfig = (feature: keyof typeof ZAKEKE_CONFIG.features) => {
  return ZAKEKE_CONFIG.features[feature]
}

// Get UI configuration for specific component
export const getUIConfig = (component: keyof typeof ZAKEKE_CONFIG.ui) => {
  return ZAKEKE_CONFIG.ui[component]
}
