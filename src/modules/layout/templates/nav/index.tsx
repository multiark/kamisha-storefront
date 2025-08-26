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
      <div className="bg-ui-bg-subtle border-b border-ui-border-base">
        <div className="content-container flex items-center justify-between py-2 text-xs text-ui-fg-subtle">
          <div className="flex items-center space-x-4">
            <span>Free shipping on orders over $50</span>
            <span>•</span>
            <span>30-day return policy</span>
          </div>
          <div className="hidden small:flex items-center space-x-4">
            <span>Customer Support</span>
            <span>•</span>
            <span>Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="relative bg-white border-b border-ui-border-base">
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

      {/* Secondary Navigation - Categories */}
      <div className="bg-ui-bg-subtle border-b border-ui-border-base">
        <div className="content-container">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8 text-sm">
              <LocalizedClientLink
                href="/collections/new-arrivals"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                New Arrivals
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
                Hijabs
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/sale"
                className="text-ui-fg-base hover:text-ui-fg-interactive font-medium transition-colors"
              >
                Sale
              </LocalizedClientLink>
            </div>
            <div className="hidden medium:flex items-center space-x-4 text-sm">
              <span className="text-ui-fg-subtle">Follow us:</span>
              <a href="#" className="text-ui-fg-subtle hover:text-ui-fg-interactive transition-colors">
                Instagram
              </a>
              <a href="#" className="text-ui-fg-subtle hover:text-ui-fg-interactive transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
