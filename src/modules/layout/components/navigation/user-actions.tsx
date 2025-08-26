"use client"

import { User, Heart, ShoppingBag, AlertCircle } from "lucide-react"
import { Button, Badge } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useCart } from "@lib/hooks/use-cart"

export default function UserActions() {
  const { cart, loading, error } = useCart()
  
  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="flex items-center space-x-2">
      {/* Account */}
      <LocalizedClientLink href="/account">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle"
          aria-label="Account"
        >
          <User className="w-5 h-5" />
        </Button>
      </LocalizedClientLink>

      {/* Wishlist */}
      <LocalizedClientLink href="/wishlist">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle relative"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </LocalizedClientLink>

      {/* Cart */}
      <LocalizedClientLink href="/cart">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle relative"
          aria-label="Shopping cart"
          disabled={loading}
        >
          <ShoppingBag className="w-5 h-5" />
          {!loading && cartItemsCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs"
              variant="primary"
            >
              {cartItemsCount > 99 ? "99+" : cartItemsCount}
            </Badge>
          )}
          {loading && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-ui-fg-subtle rounded-full animate-pulse" />
          )}
          {error && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-ui-fg-error rounded-full" title="Cart loading error" />
          )}
        </Button>
      </LocalizedClientLink>
    </div>
  )
}
