"use client"

import { User, Heart, ShoppingBag, AlertCircle, Bell, Gift } from "lucide-react"
import { Button, Badge, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useCart } from "@lib/hooks/use-cart"
import { useState } from "react"

export default function UserActions() {
  const { cart, loading, error } = useCart()
  const [showNotifications, setShowNotifications] = useState(false)
  
  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  // Mock notification count
  const notificationCount = 3

  return (
    <div className="flex items-center space-x-1">
      {/* Notifications */}
      <div className="relative">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors relative"
          aria-label="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs"
              variant="primary"
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
        </Button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-ui-border-base rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-3 border-b border-ui-border-base bg-ui-bg-subtle">
              <Text className="text-sm font-semibold text-ui-fg-base">Notifications</Text>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="p-3 border-b border-ui-border-base hover:bg-ui-bg-subtle transition-colors">
                <div className="flex items-start space-x-3">
                  <Gift className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Text className="text-sm font-medium text-ui-fg-base">New Collection Alert</Text>
                    <Text className="text-xs text-ui-fg-subtle">Ramadan Collection is now available!</Text>
                    <Text className="text-xs text-ui-fg-subtle mt-1">2 hours ago</Text>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-ui-border-base hover:bg-ui-bg-subtle transition-colors">
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Text className="text-sm font-medium text-ui-fg-base">Wishlist Update</Text>
                    <Text className="text-xs text-ui-fg-subtle">Black Abaya is back in stock!</Text>
                    <Text className="text-xs text-ui-fg-subtle mt-1">1 day ago</Text>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-ui-bg-subtle transition-colors">
                <div className="flex items-start space-x-3">
                  <ShoppingBag className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Text className="text-sm font-medium text-ui-fg-base">Sale Alert</Text>
                    <Text className="text-xs text-ui-fg-subtle">Up to 50% off on selected items!</Text>
                    <Text className="text-xs text-ui-fg-subtle mt-1">2 days ago</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-ui-border-base bg-ui-bg-subtle">
              <LocalizedClientLink
                href="/notifications"
                className="block text-center text-sm text-ui-fg-interactive hover:text-ui-fg-base transition-colors"
                onClick={() => setShowNotifications(false)}
              >
                View All Notifications
              </LocalizedClientLink>
            </div>
          </div>
        )}
      </div>

      {/* Account */}
      <LocalizedClientLink href="/account">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors group"
          aria-label="Account"
        >
          <User className="w-5 h-5 group-hover:text-ui-fg-interactive transition-colors" />
        </Button>
      </LocalizedClientLink>

      {/* Wishlist */}
      <LocalizedClientLink href="/wishlist">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors relative group"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5 group-hover:text-ui-fg-interactive transition-colors" />
          {/* Mock wishlist count */}
          <Badge
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs"
            variant="secondary"
          >
            5
          </Badge>
        </Button>
      </LocalizedClientLink>

      {/* Cart */}
      <LocalizedClientLink href="/cart">
        <Button
          variant="transparent"
          size="small"
          className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors relative group"
          aria-label="Shopping cart"
          disabled={loading}
        >
          <ShoppingBag className="w-5 h-5 group-hover:text-ui-fg-interactive transition-colors" />
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
