"use client"

import { Button } from "@medusajs/ui"
import { Camera, Smartphone, Ruler, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export const GetMeasuredButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<'intro' | 'setup' | 'measurement' | 'processing' | 'complete'>('intro')
  const [measurements, setMeasurements] = useState<any>(null)

  const handleStartMeasurement = () => {
    setCurrentStep('setup')
  }

  const handleStartCamera = () => {
    setCurrentStep('measurement')
    // Simulate camera measurement process
    setTimeout(() => {
      setCurrentStep('processing')
      // Simulate processing time
      setTimeout(() => {
        setMeasurements({
          height: 175,
          weight: 70,
          chest: 95,
          waist: 80,
          hips: 95,
          inseam: 80,
          shoulders: 45
        })
        setCurrentStep('complete')
      }, 3000)
    }, 2000)
  }

  const resetFlow = () => {
    setCurrentStep('intro')
    setMeasurements(null)
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        className="w-full h-10 mb-3 flex items-center justify-center gap-2"
        data-testid="get-measured-button"
      >
        <Camera className="w-4 h-4" />
        Get Measured
      </Button>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Virtual Measurement Tool
                    </Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Step Content */}
                  <div className="min-h-[400px] flex flex-col">
                    {currentStep === 'intro' && (
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Camera className="w-12 h-12 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            Get Your Perfect Fit
                          </h4>
                          <p className="text-gray-600">
                            Use your smartphone camera to get accurate body measurements in just a few minutes. 
                            No measuring tape needed!
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">1</span>
                            </div>
                            <span>Setup Camera</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">2</span>
                            </div>
                            <span>Take Photos</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">3</span>
                            </div>
                            <span>Get Results</span>
                          </div>
                        </div>
                        <Button
                          onClick={handleStartMeasurement}
                          variant="primary"
                          className="w-full"
                        >
                          Start Measurement
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}

                    {currentStep === 'setup' && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Camera Setup
                          </h4>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                              <h5 className="font-medium mb-2">Requirements:</h5>
                              <ul className="space-y-1">
                                <li>• Good lighting (natural light preferred)</li>
                                <li>• Plain background (wall or door)</li>
                                <li>• Stand 2-3 meters from camera</li>
                                <li>• Wear fitted clothing</li>
                                <li>• Remove shoes and accessories</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Ruler className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800">
                              <h5 className="font-medium mb-2">For Accuracy:</h5>
                              <p>Place a standard object (like a credit card) near you for scale reference</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            onClick={() => setCurrentStep('intro')}
                            variant="secondary"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={handleStartCamera}
                            variant="primary"
                          >
                            Start Camera
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 'measurement' && (
                      <div className="text-center space-y-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                          <Camera className="w-16 h-16 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Camera Active
                          </h4>
                          <p className="text-gray-600">
                            Please stand in the center of the frame and follow the on-screen instructions.
                          </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-2">Current Step: Full Body Shot</p>
                            <p>Stand straight with arms slightly away from your body</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Processing camera feed...
                        </div>
                      </div>
                    )}

                    {currentStep === 'processing' && (
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Processing Measurements
                          </h4>
                          <p className="text-gray-600">
                            Analyzing your photos and calculating precise measurements...
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600">
                            <p>This usually takes 2-3 minutes</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 'complete' && measurements && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Measurements Complete!
                          </h4>
                          <p className="text-gray-600">
                            Your virtual measurements have been captured successfully.
                          </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-medium text-green-800 mb-3">Your Measurements:</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Height:</span>
                              <span className="font-medium">{measurements.height} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Weight:</span>
                              <span className="font-medium">{measurements.weight} kg</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Chest:</span>
                              <span className="font-medium">{measurements.chest} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Waist:</span>
                              <span className="font-medium">{measurements.waist} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hips:</span>
                              <span className="font-medium">{measurements.hips} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Inseam:</span>
                              <span className="font-medium">{measurements.inseam} cm</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            onClick={resetFlow}
                            variant="secondary"
                          >
                            Measure Again
                          </Button>
                          <Button
                            onClick={() => setIsModalOpen(false)}
                            variant="primary"
                          >
                            Use Measurements
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
    </>
  )
}

export default GetMeasuredButton