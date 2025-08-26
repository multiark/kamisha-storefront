import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function AllProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  // Get a sample of all products for the home page
  const { response: { products, count } } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 12,
      fields: "*variants.calculated_price",
    },
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="content-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl small:text-4xl font-bold text-ui-fg-base mb-4">
            All Products
          </h2>
          <p className="text-lg text-ui-fg-subtle max-w-2xl mx-auto">
            Explore our complete collection of products. Find something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 mb-12">
          {products.map((product) => (
            <div key={product.id}>
              <ProductPreview product={product} region={region} />
            </div>
          ))}
        </div>

        {count > 12 && (
          <div className="text-center">
            <InteractiveLink href="/store">
              <Text className="txt-large text-ui-fg-interactive hover:text-ui-fg-interactive-hover">
                View all {count} products →
              </Text>
            </InteractiveLink>
          </div>
        )}
      </div>
    </section>
  )
}
