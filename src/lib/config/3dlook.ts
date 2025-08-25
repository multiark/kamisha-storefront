// 3DLOOK configuration
export const THREEDLOOK_CONFIG = {
  // API Configuration
  apiKey: process.env.NEXT_PUBLIC_3DLOOK_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_3DLOOK_API_URL || 'https://api.3dlook.com/v1',
  
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
  
  // API Endpoints - Update these with actual 3DLOOK endpoints
  endpoints: {
    tryOn: '/virtual-try-on',
    sizing: '/size-recommendations',
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
export const validate3DLookConfig = () => {
  const errors: string[] = []
  
  if (!THREEDLOOK_CONFIG.apiKey) {
    errors.push('3DLOOK API key is required')
  }
  
  if (!THREEDLOOK_CONFIG.baseUrl) {
    errors.push('3DLOOK API base URL is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Get configuration for specific feature
export const getFeatureConfig = (feature: keyof typeof THREEDLOOK_CONFIG.features) => {
  return THREEDLOOK_CONFIG.features[feature]
}

// Get UI configuration for specific component
export const getUIConfig = (component: keyof typeof THREEDLOOK_CONFIG.ui) => {
  return THREEDLOOK_CONFIG.ui[component]
}
