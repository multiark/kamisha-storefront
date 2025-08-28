"use client"

import { Button } from "@medusajs/ui"
import { Ruler } from "lucide-react"
import { useState, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import SizeRecommendationModal from "./size-recommendation-modal"
import { SizeRecommendation } from "./types"

type SizeRecommendationButtonProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  disabled?: boolean
  onSizeSelected?: (size: string, recommendation: SizeRecommendation) => void
}

const SizeRecommendationButton: React.FC<SizeRecommendationButtonProps> = ({
  product,
  variant,
  disabled = false,
  onSizeSelected,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSizeRecommendation = async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay for mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to get size recommendation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSizeSelected = useCallback((size: string, recommendation: SizeRecommendation) => {
    // Call the parent callback to handle the size selection
    if (onSizeSelected) {
      onSizeSelected(size, recommendation)
    }
  }, [onSizeSelected])

  const isDisabled = disabled || isLoading

  return (
    <>
      <Button
        onClick={handleSizeRecommendation}
        disabled={isDisabled}
        variant="secondary"
        className="w-full h-10 mb-3 flex items-center justify-center gap-2"
        data-testid="size-recommendation-button"
      >
        <Ruler className="w-4 h-4" />
        {isLoading ? "Loading..." : "Size Recommendation"}
      </Button>

      {isModalOpen && (
        <SizeRecommendationModal
          product={product}
          variant={variant}
          onClose={() => setIsModalOpen(false)}
          onSizeSelected={handleSizeSelected}
        />
      )}
    </>
  )
}

export default SizeRecommendationButton

