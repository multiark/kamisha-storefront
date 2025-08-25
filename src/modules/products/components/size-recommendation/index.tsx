"use client"

import { Button } from "@medusajs/ui"
import { Ruler } from "lucide-react"
import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import SizeRecommendationModal from "./size-recommendation-modal"

type SizeRecommendationButtonProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  disabled?: boolean
}

const SizeRecommendationButton: React.FC<SizeRecommendationButtonProps> = ({
  product,
  variant,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSizeRecommendation = async () => {
    setIsLoading(true)
    try {
      // Initialize Zakeke size recommendation
      // This will be implemented in the next phase
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to get size recommendation:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
        />
      )}
    </>
  )
}

export default SizeRecommendationButton
