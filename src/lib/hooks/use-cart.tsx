"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { retrieveCart } from "@lib/data/cart"

export function useCart() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const cartData = await retrieveCart()
        setCart(cartData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cart")
        setCart(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()

    // Set up an interval to refresh cart data
    const interval = setInterval(fetchCart, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const refreshCart = async () => {
    try {
      setLoading(true)
      const cartData = await retrieveCart()
      setCart(cartData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh cart")
    } finally {
      setLoading(false)
    }
  }

  return {
    cart,
    loading,
    error,
    refreshCart,
  }
}
