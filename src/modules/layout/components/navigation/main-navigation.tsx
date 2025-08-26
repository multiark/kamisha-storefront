"use client"

import { useState } from "react"
import { ChevronDown, Search, User, Heart, ShoppingBag } from "lucide-react"
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

export default function MainNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { countryCode } = useParams()

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="hidden medium:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <div key={item.label} className="relative group">
          {item.children ? (
            <div
              className="flex items-center space-x-1 cursor-pointer py-2"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Text className="text-ui-fg-base hover:text-ui-fg-interactive transition-colors">
                {item.label}
              </Text>
              <ChevronDown className="w-4 h-4 text-ui-fg-subtle" />
            </div>
          ) : (
            <LocalizedClientLink
              href={item.href}
              className="block py-2 text-ui-fg-base hover:text-ui-fg-interactive transition-colors"
              onClick={closeAllDropdowns}
            >
              {item.label}
            </LocalizedClientLink>
          )}

          {/* Dropdown Menu */}
          {item.children && activeDropdown === item.label && (
            <div
              className="absolute top-full left-0 mt-1 w-48 bg-white border border-ui-border-base rounded-lg shadow-lg z-50 py-2"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.children.map((child) => (
                <LocalizedClientLink
                  key={child.label}
                  href={child.href}
                  className="block px-4 py-2 text-ui-fg-base hover:text-ui-fg-interactive hover:bg-ui-bg-subtle transition-colors"
                  onClick={closeAllDropdowns}
                >
                  {child.label}
                </LocalizedClientLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
