import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ProductsByCategory from "@modules/home/components/products-by-category"
import AllProducts from "@modules/home/components/all-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Kamisha Online Store - Discover Your Perfect Fit",
  description:
    "Experience the future of online shopping with AI-powered virtual try-on, smart size recommendations, and premium quality products. Shop by category or explore our complete collection.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* Hero Slider */}
      <Hero />
      
      {/* Featured Products by Collection */}
      <section className="py-12">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl small:text-4xl font-bold text-ui-fg-base mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-ui-fg-subtle max-w-2xl mx-auto">
              Discover our handpicked collections featuring the latest trends and timeless classics.
            </p>
          </div>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </section>

      {/* All Products Preview */}
      <AllProducts region={region} />

      {/* Products by Category */}
      <ProductsByCategory region={region} />
    </>
  )
}
