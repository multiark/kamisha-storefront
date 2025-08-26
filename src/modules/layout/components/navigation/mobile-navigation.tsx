"use client"

import { useState } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams } from "next/navigation"

type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Abayas", href: "/collections/abayas" },
      { label: "Hijabs", href: "/collections/hijabs" },
      { label: "Dresses", href: "/collections/dresses" },
      { label: "Outerwear", href: "/collections/outerwear" },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Modest Fashion", href: "/categories/modest-fashion" },
      { label: "Islamic Clothing", href: "/categories/islamic-clothing" },
      { label: "Accessories", href: "/categories/accessories" },
    ],
  },
  {
    label: "Sale",
    href: "/sale",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
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
        className="p-2"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ui-border-base">
              <Text className="text-lg font-semibold">Menu</Text>
              <Button
                variant="transparent"
                size="small"
                onClick={closeMenu}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="py-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleItem(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-ui-bg-subtle transition-colors"
                      >
                        <Text className="text-ui-fg-base">{item.label}</Text>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            expandedItems.includes(item.label) ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {expandedItems.includes(item.label) && (
                        <div className="bg-ui-bg-subtle">
                          {item.children.map((child) => (
                            <LocalizedClientLink
                              key={child.label}
                              href={child.href}
                              className="block px-8 py-2 text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                              onClick={closeMenu}
                            >
                              {child.label}
                            </LocalizedClientLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <LocalizedClientLink
                      href={item.href}
                      className="block px-4 py-3 text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ui-border-base bg-ui-bg-subtle">
              <div className="flex items-center justify-between">
                <LocalizedClientLink
                  href="/account"
                  className="flex items-center space-x-2 text-ui-fg-base hover:text-ui-fg-interactive"
                  onClick={closeMenu}
                >
                  <Text>Account</Text>
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center space-x-2 text-ui-fg-base hover:text-ui-fg-interactive"
                  onClick={closeMenu}
                >
                  <Text>Cart</Text>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
