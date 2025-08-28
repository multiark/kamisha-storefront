"use client"

import { useState } from "react"
import { Menu, X, ChevronRight, Sparkles, TrendingUp, Star, Heart, ShoppingBag, User } from "lucide-react"
import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams } from "next/navigation"

type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
  icon?: React.ReactNode
  badge?: string
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    icon: <TrendingUp className="w-4 h-4" />,
    badge: "NEW"
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { 
        label: "Abayas", 
        href: "/collections/abayas",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Hijabs & Scarves", 
        href: "/collections/hijabs",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Modest Dresses", 
        href: "/collections/dresses",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Outerwear", 
        href: "/collections/outerwear",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Tunics & Tops", 
        href: "/collections/tunics",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Bottoms", 
        href: "/collections/bottoms",
        icon: <Star className="w-4 h-4" />
      }
    ]
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { 
        label: "Modest Fashion", 
        href: "/categories/modest-fashion",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Islamic Clothing", 
        href: "/categories/islamic-clothing",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Accessories", 
        href: "/categories/accessories",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Shoes", 
        href: "/categories/shoes",
        icon: <Star className="w-4 h-4" />
      },
      { 
        label: "Bags", 
        href: "/categories/bags",
        icon: <Star className="w-4 h-4" />
      }
    ]
  },
  {
    label: "Sale",
    href: "/sale",
    badge: "SALE"
  },
  {
    label: "Trending",
    href: "/trending",
    icon: <TrendingUp className="w-4 h-4" />
  }
]

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { countryCode } = useParams()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setExpandedItems([])
    }
  }

  const toggleItem = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const closeMenu = () => {
    setIsOpen(false)
    setExpandedItems([])
  }

  return (
    <div className="medium:hidden">
      {/* Hamburger Button */}
      <Button
        variant="transparent"
        size="small"
        onClick={toggleMenu}
        className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ui-border-base bg-ui-bg-subtle">
              <Text className="text-lg font-semibold text-ui-fg-base">Menu</Text>
              <Button
                variant="transparent"
                size="small"
                onClick={closeMenu}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-ui-border-base">
              <div className="grid grid-cols-3 gap-3">
                <LocalizedClientLink
                  href="/account"
                  className="flex flex-col items-center p-3 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors"
                  onClick={closeMenu}
                >
                  <User className="w-5 h-5 text-ui-fg-subtle mb-1" />
                  <Text className="text-xs text-ui-fg-subtle">Account</Text>
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/wishlist"
                  className="flex flex-col items-center p-3 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors"
                  onClick={closeMenu}
                >
                  <Heart className="w-5 h-5 text-ui-fg-subtle mb-1" />
                  <Text className="text-xs text-ui-fg-subtle">Wishlist</Text>
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/cart"
                  className="flex flex-col items-center p-3 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors"
                  onClick={closeMenu}
                >
                  <ShoppingBag className="w-5 h-5 text-ui-fg-subtle mb-1" />
                  <Text className="text-xs text-ui-fg-subtle">Cart</Text>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="py-4 flex-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleItem(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-ui-bg-subtle transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon && (
                            <span className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors">
                              {item.icon}
                            </span>
                          )}
                          <Text className="text-ui-fg-base font-medium">{item.label}</Text>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform text-ui-fg-subtle ${
                              expandedItems.includes(item.label) ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </button>
                      {expandedItems.includes(item.label) && (
                        <div className="bg-ui-bg-subtle border-l-2 border-ui-border-base">
                          {item.children.map((child) => (
                            <LocalizedClientLink
                              key={child.label}
                              href={child.href}
                              className="flex items-center space-x-3 px-8 py-3 text-ui-fg-subtle hover:text-ui-fg-base hover:bg-ui-bg-base transition-colors"
                              onClick={closeMenu}
                            >
                              {child.icon && (
                                <span className="text-ui-fg-subtle">
                                  {child.icon}
                                </span>
                              )}
                              <span className="font-medium">{child.label}</span>
                            </LocalizedClientLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <LocalizedClientLink
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-ui-fg-base hover:bg-ui-bg-subtle transition-colors group"
                      onClick={closeMenu}
                    >
                      {item.icon && (
                        <span className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors">
                          {item.icon}
                        </span>
                      )}
                      <Text className="font-medium">{item.label}</Text>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </LocalizedClientLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ui-border-base bg-ui-bg-subtle">
              <div className="space-y-3">
                <LocalizedClientLink
                  href="/search"
                  className="flex items-center justify-center w-full py-3 bg-ui-bg-base border border-ui-border-base rounded-lg hover:bg-ui-bg-subtle transition-colors"
                  onClick={closeMenu}
                >
                  <Text className="font-medium">Search Products</Text>
                </LocalizedClientLink>
                <div className="text-center">
                  <Text className="text-xs text-ui-fg-subtle">
                    Free shipping on orders over $50
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
