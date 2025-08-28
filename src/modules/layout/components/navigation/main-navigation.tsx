"use client"

import { useState } from "react"
import { ChevronDown, Search, User, Heart, ShoppingBag, Sparkles, TrendingUp, Star } from "lucide-react"
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
              className="flex items-center space-x-2 cursor-pointer py-3 px-2 rounded-lg hover:bg-ui-bg-subtle transition-all duration-200"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.icon && (
                <span className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors">
                  {item.icon}
                </span>
              )}
              <Text className="text-ui-fg-base hover:text-ui-fg-interactive transition-colors font-medium">
                {item.label}
              </Text>
              <ChevronDown className="w-4 h-4 text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors" />
            </div>
          ) : (
            <LocalizedClientLink
              href={item.href}
              className="flex items-center space-x-2 py-3 px-2 rounded-lg hover:bg-ui-bg-subtle transition-all duration-200 group"
              onClick={closeAllDropdowns}
            >
              {item.icon && (
                <span className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors">
                  {item.icon}
                </span>
              )}
              <Text className="text-ui-fg-base hover:text-ui-fg-interactive transition-colors font-medium">
                {item.label}
              </Text>
              {item.badge && (
                <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </LocalizedClientLink>
          )}

          {/* Enhanced Dropdown Menu */}
          {item.children && activeDropdown === item.label && (
            <div
              className="absolute top-full left-0 mt-2 w-64 bg-white border border-ui-border-base rounded-xl shadow-2xl z-50 py-4 overflow-hidden"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="px-4 py-2 bg-ui-bg-subtle border-b border-ui-border-base">
                <Text className="text-sm font-semibold text-ui-fg-base">{item.label}</Text>
              </div>
              <div className="py-2">
                {item.children.map((child) => (
                  <LocalizedClientLink
                    key={child.label}
                    href={child.href}
                    className="flex items-center space-x-3 px-4 py-3 text-ui-fg-base hover:text-ui-fg-interactive hover:bg-ui-bg-subtle transition-all duration-200 group"
                    onClick={closeAllDropdowns}
                  >
                    {child.icon && (
                      <span className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors">
                        {child.icon}
                      </span>
                    )}
                    <span className="font-medium">{child.label}</span>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
