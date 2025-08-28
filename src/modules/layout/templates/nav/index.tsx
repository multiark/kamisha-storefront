import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import Logo from "@modules/layout/components/logo"
import MainNavigation from "@modules/layout/components/navigation/main-navigation"
import MobileNavigation from "@modules/layout/components/navigation/mobile-navigation"
import SearchBar from "@modules/layout/components/navigation/search-bar"
import UserActions from "@modules/layout/components/navigation/user-actions"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="content-container flex items-center justify-between py-2 text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Free shipping on orders over $50</span>
            </span>
            <span>•</span>
            <span>30-day return policy</span>
            <span>•</span>
            <span>Secure checkout</span>
          </div>
          <div className="hidden small:flex items-center space-x-4">
            <LocalizedClientLink href="/support" className="hover:text-pink-200 transition-colors">
              Customer Support
            </LocalizedClientLink>
            <span>•</span>
            <LocalizedClientLink href="/track-order" className="hover:text-pink-200 transition-colors">
              Track Order
            </LocalizedClientLink>
            <span>•</span>
            <LocalizedClientLink href="/size-guide" className="hover:text-pink-200 transition-colors">
              Size Guide
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="relative bg-white border-b border-ui-border-base shadow-sm">
        <div className="content-container">
          <div className="flex items-center justify-between h-20">
            {/* Left Section - Mobile Menu & Logo */}
            <div className="flex items-center space-x-4">
              <MobileNavigation />
              <Logo variant="default" />
            </div>

            {/* Center Section - Main Navigation */}
            <div className="hidden medium:flex items-center justify-center flex-1">
              <MainNavigation />
            </div>

            {/* Right Section - Search, User Actions & Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden medium:block">
                <SearchBar />
              </div>
              <div className="hidden small:block">
                <UserActions />
              </div>
              <Suspense
                fallback={
                  <div className="w-8 h-8 bg-ui-bg-subtle rounded-full animate-pulse" />
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Secondary Navigation - Fashion Categories */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-ui-border-base">
        <div className="content-container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8 text-sm">
              <LocalizedClientLink
                href="/collections/new-arrivals"
                className="flex items-center space-x-2 text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors group"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>New Arrivals</span>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/abayas"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                Abayas
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/hijabs"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                Hijabs & Scarves
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/dresses"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                Modest Dresses
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/outerwear"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                Outerwear
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/sale"
                className="text-red-600 hover:text-red-700 font-bold transition-colors"
              >
                SALE
              </LocalizedClientLink>
            </div>
            <div className="hidden medium:flex items-center space-x-4 text-sm">
              <span className="text-ui-fg-subtle">Follow us:</span>
              <a href="#" className="text-ui-fg-subtle hover:text-ui-fg-interactive transition-colors hover:scale-110 transform">
                Instagram
              </a>
              <a href="#" className="text-ui-fg-subtle hover:text-ui-fg-interactive transition-colors hover:scale-110 transform">
                Facebook
              </a>
              <a href="#" className="text-ui-fg-subtle hover:text-ui-fg-interactive transition-colors hover:scale-110 transform">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2">
        <div className="content-container text-center">
          <p className="text-sm font-medium">
            🎉 Ramadan Collection Now Available! Up to 40% off on selected items. 
            <LocalizedClientLink href="/collections/ramadan" className="ml-2 underline hover:no-underline">
              Shop Now
            </LocalizedClientLink>
          </p>
        </div>
      </div>
    </div>
  )
}
