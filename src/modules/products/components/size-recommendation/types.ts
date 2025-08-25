export type BodyMeasurements = {
  height: string
  weight: string
  chest: string
  waist: string
  hips: string
  inseam: string
  shoulders: string
  age: string
  gender: string
}

export type SizeRecommendation = {
  recommendedSize: string
  confidence: number
  alternativeSizes: string[]
  fitNotes: string[]
  measurements: BodyMeasurements
  productId: string
  variantId?: string
}

export type SizeChartData = {
  size: string
  chest: string
  waist: string
  hips: string
  length: string
  shoulders: string
  sleeves: string
}

export type MeasurementUnit = 'metric' | 'imperial'

export type SizeRecommendationRequest = {
  measurements: BodyMeasurements
  productId: string
  variantId?: string
  preferences?: {
    fitStyle: 'slim' | 'regular' | 'loose'
    comfortLevel: 'tight' | 'comfortable' | 'loose'
  }
}

