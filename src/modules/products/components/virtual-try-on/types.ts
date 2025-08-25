export type VirtualTryOnSession = {
  id: string
  productId: string
  variantId: string
  status: 'initializing' | 'ready' | 'processing' | 'completed' | 'error'
  createdAt: Date
  expiresAt: Date
}

export type TryOnResult = {
  id: string
  sessionId: string
  originalImage: string
  processedImage: string
  confidence: number
  fitNotes: string[]
  createdAt: Date
}

export type CameraSettings = {
  facingMode: 'user' | 'environment'
  width: number
  height: number
  aspectRatio: number
}

export type ProductOverlay = {
  position: { x: number; y: number }
  scale: number
  rotation: number
  opacity: number
}
