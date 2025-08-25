"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X, Ruler, Info, CheckCircle } from "lucide-react"
import { Fragment, useState, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import SizeChart from "./size-chart"
import MeasurementForm from "./measurement-form"

type SizeRecommendationModalProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  onClose: () => void
}

type BodyMeasurements = {
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

type SizeRecommendation = {
  recommendedSize: string
  confidence: number
  alternativeSizes: string[]
  fitNotes: string[]
}

const SizeRecommendationModal: React.FC<SizeRecommendationModalProps> = ({
  product,
  variant,
  onClose,
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
      // Import Zakeke service dynamically to avoid SSR issues
      const { zakekeService } = await import("@lib/data/zakeke")
      
      // Convert string measurements to numbers
      const numericMeasurements = {
        height: parseFloat(measurements.height),
        weight: parseFloat(measurements.weight),
        chest: parseFloat(measurements.chest) || 0,
        waist: parseFloat(measurements.waist) || 0,
        hips: parseFloat(measurements.hips) || 0,
        inseam: parseFloat(measurements.inseam) || 0,
        shoulders: parseFloat(measurements.shoulders) || 0,
        age: parseFloat(measurements.age) || 0,
        gender: measurements.gender as 'male' | 'female' | 'other',
      }
      
      // Get size recommendation from Zakeke
      const zakekeRecommendation = await zakekeService.getSizeRecommendation({
        productId: product.id!,
        variantId: variant?.id,
        measurements: numericMeasurements,
      })
      
      // Convert to our format
      const recommendation: SizeRecommendation = {
        recommendedSize: zakekeRecommendation.recommendedSize,
        confidence: zakekeRecommendation.confidence,
        alternativeSizes: zakekeRecommendation.alternativeSizes,
        fitNotes: zakekeRecommendation.fitNotes,
        measurements: measurements,
        productId: product.id!,
        variantId: variant?.id,
      }
      
      setRecommendation(recommendation)
      setActiveTab('recommendation')
    } catch (error) {
      console.error('Failed to get size recommendation:', error)
      // Show user-friendly error message
    } finally {
      setIsProcessing(false)
    }
  }, [measurements, product.id, variant?.id])

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
  }, [])

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

                      <div className="flex justify-center">
                        <Button
                          onClick={() => setActiveTab('measurements')}
                          variant="secondary"
                        >
                          Adjust Measurements
                        </Button>
                      </div>
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
