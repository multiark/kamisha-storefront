"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X, Camera, RotateCcw, Download, Share2 } from "lucide-react"
import { Fragment, useState, useRef, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"

type VirtualTryOnModalProps = {
  product: HttpTypes.StoreProduct
  variant: HttpTypes.StoreProductVariant
  onClose: () => void
}

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  product,
  variant,
  onClose,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error("Failed to access camera:", error)
      // Fallback: show error message or use image upload
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraActive(false)
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  const retakePhoto = useCallback(() => {
    setCapturedImage(null)
    startCamera()
  }, [startCamera])

  const processTryOn = useCallback(async () => {
    if (!capturedImage) return
    
    setIsProcessing(true)
    try {
      // Import 3DLOOK service dynamically to avoid SSR issues
      const { threeDLookService } = await import("@lib/data/3dlook")
      
      // Create try-on session
      const session = await threeDLookService.createTryOnSession({
        productId: product.id!,
        variantId: variant.id!,
        userImage: capturedImage,
      })
      
      // Process the try-on
      const result = await threeDLookService.processTryOn(session.sessionId, capturedImage)
      
      console.log("Virtual try-on completed:", result)
      // TODO: Display the result image
      
    } catch (error) {
      console.error("Failed to process try-on:", error)
      // Show user-friendly error message
    } finally {
      setIsProcessing(false)
    }
  }, [capturedImage, product.id, variant.id])

  const downloadImage = useCallback(() => {
    if (capturedImage) {
      const link = document.createElement('a')
      link.download = `try-on-${product.title}-${Date.now()}.jpg`
      link.href = capturedImage
      link.click()
    }
  }, [capturedImage, product.title])

  const shareImage = useCallback(() => {
    if (capturedImage && navigator.share) {
      // Convert base64 to blob for sharing
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'try-on.jpg', { type: 'image/jpeg' })
          navigator.share({
            title: `Try-on: ${product.title}`,
            text: `Check out how this ${product.title} looks on me!`,
            files: [file]
          })
        })
    }
  }, [capturedImage, product.title])

  // Start camera when modal opens
  useState(() => {
    startCamera()
    return () => stopCamera()
  })

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Virtual Try-On: {product.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Camera/Image Section */}
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Your Photo</h4>
                      {!capturedImage ? (
                        <div className="relative">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          {isCameraActive && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                onClick={captureImage}
                                className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-full shadow-lg"
                              >
                                <Camera className="w-5 h-5 mr-2" />
                                Take Photo
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={capturedImage}
                            alt="Captured photo"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            onClick={retakePhoto}
                            variant="secondary"
                            className="absolute top-2 right-2"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Preview Section */}
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Product Preview</h4>
                      <div className="text-center">
                        <img
                          src={product.images?.[0]?.url || "/placeholder-product.jpg"}
                          alt={product.title}
                          className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                        />
                        <p className="text-sm text-gray-600">{product.title}</p>
                        {variant && (
                          <p className="text-xs text-gray-500 mt-1">
                            Variant: {variant.title}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {capturedImage ? (
                        <>
                          <Button
                            onClick={processTryOn}
                            disabled={isProcessing}
                            className="w-full"
                            variant="primary"
                          >
                            {isProcessing ? "Processing..." : "Try On Product"}
                          </Button>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              onClick={downloadImage}
                              variant="secondary"
                              className="w-full"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              onClick={shareImage}
                              variant="secondary"
                              className="w-full"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 text-center">
                          Take a photo to start your virtual try-on
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default VirtualTryOnModal
