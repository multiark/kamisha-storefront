"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X, Ruler, Info, CheckCircle, Camera, Smartphone, ShoppingCart } from "lucide-react"
import { Fragment, useState, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import SizeChart from "./size-chart"
import MeasurementForm from "./measurement-form"
import { BodyMeasurements, SizeRecommendation } from "./types"

type SizeRecommendationModalProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  onClose: () => void
  onSizeSelected?: (size: string, recommendation: SizeRecommendation) => void
}

// Mock size recommendation service
const mockSizeRecommendationService = {
  async getSizeRecommendation(measurements: BodyMeasurements, productId: string): Promise<SizeRecommendation> {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock logic based on measurements
    const height = parseFloat(measurements.height)
    const weight = parseFloat(measurements.weight)
    const chest = parseFloat(measurements.chest)
    
    let recommendedSize = "M"
    let confidence = 85
    
    // Simple mock sizing logic
    if (height > 180 && chest > 100) {
      recommendedSize = "L"
      confidence = 90
    } else if (height < 165 && chest < 90) {
      recommendedSize = "S"
      confidence = 88
    } else if (height > 175 && chest > 95) {
      recommendedSize = "L"
      confidence = 87
    }
    
    const alternativeSizes = recommendedSize === "M" ? ["S", "L"] : 
                           recommendedSize === "L" ? ["M", "XL"] : ["M", "L"]
    
    const fitNotes = [
      "Based on your measurements, this size should provide a comfortable fit",
      "Consider your preferred fit style (slim, regular, or loose)",
      "If between sizes, we recommend sizing up for a more relaxed fit"
    ]
    
    return {
      recommendedSize,
      confidence,
      alternativeSizes,
      fitNotes,
      measurements,
      productId,
      variantId: undefined
    }
  }
}

const SizeRecommendationModal: React.FC<SizeRecommendationModalProps> = ({
  product,
  variant,
  onClose,
  onSizeSelected,
}) => {
  const [activeTab, setActiveTab] = useState<'measurements' | 'chart' | 'recommendation'>('measurements')
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    shoulders: '',
    age: '',
    gender: ''
  })
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [measurementMethod, setMeasurementMethod] = useState<'manual' | 'virtual' | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleMeasurementChange = useCallback((field: keyof BodyMeasurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const getSizeRecommendation = useCallback(async () => {
    if (!measurements.height || !measurements.weight) {
      alert('Please fill in at least height and weight')
      return
    }

    setIsProcessing(true)
    try {
      // Use mock service instead of real API
      const recommendation = await mockSizeRecommendationService.getSizeRecommendation(measurements, product.id!)
      setRecommendation(recommendation)
      setActiveTab('recommendation')
    } catch (error) {
      console.error('Failed to get size recommendation:', error)
      alert('Failed to get size recommendation. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [measurements, product.id])

  const resetForm = useCallback(() => {
    setMeasurements({
      height: '',
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      inseam: '',
      shoulders: '',
      age: '',
      gender: ''
    })
    setRecommendation(null)
    setActiveTab('measurements')
    setMeasurementMethod(null)
  }, [])

  const handleVirtualMeasurement = () => {
    setMeasurementMethod('virtual')
    // Simulate virtual measurement process
    setTimeout(() => {
      // Mock virtual measurement results
      setMeasurements({
        height: '175',
        weight: '70',
        chest: '95',
        waist: '80',
        hips: '95',
        inseam: '80',
        shoulders: '45',
        age: '28',
        gender: 'male'
      })
      setMeasurementMethod(null)
    }, 3000)
  }

  const handleAddToCart = useCallback(async () => {
    if (!recommendation) return

    setIsAddingToCart(true)
    try {
      // Call the parent callback to handle adding to cart
      if (onSizeSelected) {
        onSizeSelected(recommendation.recommendedSize, recommendation)
      }
      
      // Show success message briefly before closing
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('Failed to add to cart. Please try again.')
    } finally {
      setIsAddingToCart(false)
    }
  }, [recommendation, onSizeSelected, onClose])

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
                    Size Recommendation: {product.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('measurements')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'measurements'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Ruler className="w-4 h-4 inline mr-2" />
                      Measurements
                    </button>
                    <button
                      onClick={() => setActiveTab('chart')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'chart'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Info className="w-4 h-4 inline mr-2" />
                      Size Chart
                    </button>
                    {recommendation && (
                      <button
                        onClick={() => setActiveTab('recommendation')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'recommendation'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Recommendation
                      </button>
                    )}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'measurements' && (
                    <div className="space-y-6">
                      {/* Measurement Method Selection */}
                      {!measurementMethod && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                            <Ruler className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h4 className="font-medium text-gray-900 mb-2">Manual Measurements</h4>
                            <p className="text-sm text-gray-600">Enter your measurements manually using a measuring tape</p>
                            <Button
                              onClick={() => setMeasurementMethod('manual')}
                              variant="secondary"
                              className="mt-3"
                            >
                              Choose Manual
                            </Button>
                          </div>
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h4 className="font-medium text-gray-900 mb-2">Virtual Try-On</h4>
                            <p className="text-sm text-gray-600">Use your phone camera for AI-powered measurements</p>
                            <Button
                              onClick={handleVirtualMeasurement}
                              variant="secondary"
                              className="mt-3"
                            >
                              Start Virtual
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Virtual Measurement Progress */}
                      {measurementMethod === 'virtual' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                          <h4 className="text-lg font-medium text-blue-800 mb-2">Processing Virtual Measurements</h4>
                          <p className="text-blue-700">Please stand 2-3 meters from your camera and follow the on-screen instructions</p>
                          <div className="mt-4 text-sm text-blue-600">
                            <Smartphone className="w-4 h-4 inline mr-2" />
                            Keep your phone steady and well-lit
                          </div>
                        </div>
                      )}

                      {/* Manual Measurement Form */}
                      {measurementMethod === 'manual' && (
                        <>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex">
                              <Info className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-blue-800">
                                  How to measure yourself
                                </h4>
                                <p className="text-sm text-blue-700 mt-1">
                                  For the most accurate size recommendation, please provide your body measurements. 
                                  You can use a measuring tape or our virtual measurement tool.
                                </p>
                              </div>
                            </div>
                          </div>

                          <MeasurementForm
                            measurements={measurements}
                            onMeasurementChange={handleMeasurementChange}
                          />

                          <div className="flex justify-between">
                            <Button
                              onClick={resetForm}
                              variant="secondary"
                            >
                              Reset Form
                            </Button>
                            <Button
                              onClick={getSizeRecommendation}
                              disabled={isProcessing}
                              variant="primary"
                            >
                              {isProcessing ? 'Processing...' : 'Get Size Recommendation'}
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Show measurements if virtual measurement completed */}
                      {measurementMethod === null && measurements.height && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-green-800">
                                Measurements Complete
                              </h4>
                              <p className="text-sm text-green-700 mt-1">
                                Your virtual measurements have been captured. Click below to get your size recommendation.
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={getSizeRecommendation}
                            disabled={isProcessing}
                            variant="primary"
                            className="mt-3"
                          >
                            {isProcessing ? 'Processing...' : 'Get Size Recommendation'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'chart' && (
                    <SizeChart product={product} />
                  )}

                  {activeTab === 'recommendation' && recommendation && (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="text-center">
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Size Recommendation
                          </h3>
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {recommendation.recommendedSize}
                          </div>
                          <p className="text-green-700">
                            {recommendation.confidence}% confidence level
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Alternative Sizes</h4>
                          <div className="flex gap-2">
                            {recommendation.alternativeSizes.map((size) => (
                              <span
                                key={size}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Fit Notes</h4>
                          <ul className="space-y-2">
                            {recommendation.fitNotes.map((note, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={() => setActiveTab('measurements')}
                          variant="secondary"
                        >
                          Adjust Measurements
                        </Button>
                        <Button
                          onClick={handleAddToCart}
                          disabled={isAddingToCart}
                          variant="primary"
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                        </Button>
                      </div>

                      {/* Success message when adding to cart */}
                      {isAddingToCart && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-green-700 font-medium">
                            Adding Size {recommendation.recommendedSize} to your cart...
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SizeRecommendationModal
