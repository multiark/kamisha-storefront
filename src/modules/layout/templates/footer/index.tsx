import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Shield, Truck, RefreshCw, CreditCard } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container flex flex-col w-full">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-base hover:text-ui-fg-interactive uppercase font-bold"
            >
              Kamisha
            </LocalizedClientLink>
            <p className="text-ui-fg-subtle max-w-xs">
              Your premier destination for modest fashion, Islamic clothing, and contemporary abayas. 
              Discover elegance in every stitch.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors">
                <Instagram className="w-5 h-5 text-ui-fg-subtle hover:text-ui-fg-interactive" />
              </a>
              <a href="#" className="p-2 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors">
                <Facebook className="w-5 h-5 text-ui-fg-subtle hover:text-ui-fg-interactive" />
              </a>
              <a href="#" className="p-2 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors">
                <Twitter className="w-5 h-5 text-ui-fg-subtle hover:text-ui-fg-interactive" />
              </a>
              <a href="#" className="p-2 bg-ui-bg-subtle rounded-lg hover:bg-ui-bg-base transition-colors">
                <Mail className="w-5 h-5 text-ui-fg-subtle hover:text-ui-fg-interactive" />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus txt-ui-fg-base font-semibold">
                  Shop by Category
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base transition-colors",
                            children && "txt-small-plus font-medium"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections Section */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus txt-ui-fg-base font-semibold">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customer Service Section */}
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus txt-ui-fg-base font-semibold">Customer Service</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-ui-fg-base transition-colors">
                    Contact Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/size-guide" className="hover:text-ui-fg-base transition-colors">
                    Size Guide
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/shipping" className="hover:text-ui-fg-base transition-colors">
                    Shipping Info
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/returns" className="hover:text-ui-fg-base transition-colors">
                    Returns & Exchanges
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/faq" className="hover:text-ui-fg-base transition-colors">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-8 border-t border-ui-border-base">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <Text className="text-sm font-medium text-ui-fg-base">Secure Shopping</Text>
                <Text className="text-xs text-ui-fg-subtle">SSL Encrypted</Text>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <Text className="text-sm font-medium text-ui-fg-base">Free Shipping</Text>
                <Text className="text-xs text-ui-fg-subtle">Orders over $50</Text>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-8 h-8 text-purple-600" />
              <div>
                <Text className="text-sm font-medium text-ui-fg-base">Easy Returns</Text>
                <Text className="text-xs text-ui-fg-subtle">30-day policy</Text>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-orange-600" />
              <div>
                <Text className="text-sm font-medium text-ui-fg-base">Multiple Payment</Text>
                <Text className="text-xs text-ui-fg-subtle">Options available</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-ui-border-base">
          <div className="text-center max-w-md mx-auto">
            <Text className="text-lg font-semibold text-ui-fg-base mb-2">
              Stay Updated with Latest Collections
            </Text>
            <Text className="text-sm text-ui-fg-subtle mb-4">
              Subscribe to our newsletter for exclusive offers and new arrivals
            </Text>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-ui-border-base rounded-lg focus:outline-none focus:border-ui-border-interactive"
              />
              <button className="px-6 py-2 bg-ui-fg-interactive text-white rounded-lg hover:bg-ui-fg-interactive-hover transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex w-full py-6 justify-between text-ui-fg-muted border-t border-ui-border-base">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Kamisha. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> for modest fashion.
          </Text>
          <div className="flex space-x-6 text-sm">
            <LocalizedClientLink href="/privacy" className="hover:text-ui-fg-base transition-colors">
              Privacy Policy
            </LocalizedClientLink>
            <LocalizedClientLink href="/terms" className="hover:text-ui-fg-base transition-colors">
              Terms of Service
            </LocalizedClientLink>
            <LocalizedClientLink href="/sitemap" className="hover:text-ui-fg-base transition-colors">
              Sitemap
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
