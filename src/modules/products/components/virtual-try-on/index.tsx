"use client"

import { Button } from "@medusajs/ui"
import { Camera } from "lucide-react"
import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import VirtualTryOnModal from "./virtual-try-on-modal"

type VirtualTryOnButtonProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  disabled?: boolean
}

const VirtualTryOnButton: React.FC<VirtualTryOnButtonProps> = ({
  product,
  variant,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTryOn = async () => {
    if (!variant) return
    
    setIsLoading(true)
    try {
      // Initialize 3DLOOK try-on session
      // This will be implemented in the next phase
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to initialize virtual try-on:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = disabled || !variant || isLoading

  return (
    <>
      <Button
        onClick={handleTryOn}
        disabled={isDisabled}
        variant="secondary"
        className="w-full h-10 mb-3 flex items-center justify-center gap-2"
        data-testid="virtual-try-on-button"
      >
        <Camera className="w-4 h-4" />
        {isLoading ? "Loading..." : "Virtual Try On"}
      </Button>

      {isModalOpen && (
        <VirtualTryOnModal
          product={product}
          variant={variant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default VirtualTryOnButton

