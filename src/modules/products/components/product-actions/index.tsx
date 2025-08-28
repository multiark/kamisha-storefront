"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import VirtualTryOnButton from "../virtual-try-on"
import SizeRecommendationButton from "../size-recommendation"
import GetMeasuredButton from "../get-measured"
import { SizeRecommendation } from "../size-recommendation/types"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)
  const [sizeRecommendation, setSizeRecommendation] = useState<SizeRecommendation | null>(null)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    // If we have a recommended size, try to find a variant that matches
    if (recommendedSize) {
      const recommendedVariant = product.variants.find((v) => {
        const variantOptions = optionsAsKeymap(v.options)
        // Check if any option matches the recommended size
        return variantOptions && Object.values(variantOptions).some(value => 
          value?.toLowerCase().includes(recommendedSize.toLowerCase())
        )
      })
      if (recommendedVariant) {
        return recommendedVariant
      }
    }

    // Fall back to original logic
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options, recommendedSize])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
    // Clear recommended size when user manually selects options
    setRecommendedSize(null)
    setSizeRecommendation(null)
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  // Handle size recommendation selection
  const handleSizeSelected = (size: string, recommendation: SizeRecommendation) => {
    setRecommendedSize(size)
    setSizeRecommendation(recommendation)
    
    // Try to find a variant that matches the recommended size
    if (product.variants) {
      const matchingVariant = product.variants.find((v) => {
        const variantOptions = optionsAsKeymap(v.options)
        return variantOptions && Object.values(variantOptions).some(value => 
          value?.toLowerCase().includes(size.toLowerCase())
        )
      })
      
      if (matchingVariant) {
        // Update options to match the recommended size variant
        const variantOptions = optionsAsKeymap(matchingVariant.options)
        setOptions(variantOptions ?? {})
      }
    }
  }

  // Get button text based on state
  const getButtonText = () => {
    if (!selectedVariant && !options) {
      return "Select variant"
    }
    
    if (sizeRecommendation) {
      return `Add Size ${recommendedSize} to Cart`
    }
    
    if (!inStock || !isValidVariant) {
      return "Out of stock"
    }
    
    return "Add to cart"
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
          {/* Virtual Try-On and Size Recommendation Buttons */}
          <div className="space-y-3 mb-4">
            {/* <VirtualTryOnButton
              product={product}
              variant={selectedVariant}
              disabled={disabled}
            /> */}
            <SizeRecommendationButton
              product={product}
              variant={selectedVariant}
              disabled={disabled}
              onSizeSelected={handleSizeSelected}
            />
            {/* <GetMeasuredButton /> */}
          </div>
        </div>

        {/* Show size recommendation info if available */}
        {sizeRecommendation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-blue-800">
                  Recommended Size: {recommendedSize}
                </h4>
                <p className="text-sm text-blue-700">
                  {sizeRecommendation.confidence}% confidence based on your measurements
                </p>
              </div>
              <Button
                onClick={() => {
                  setRecommendedSize(null)
                  setSizeRecommendation(null)
                }}
                variant="secondary"
                size="base"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {isAdding ? 'Adding...' : getButtonText()}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
