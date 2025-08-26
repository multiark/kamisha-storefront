import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

type CategoryProductGridProps = {
  category: HttpTypes.StoreProductCategory & {
    products: HttpTypes.StoreProduct[]
  }
  region: HttpTypes.StoreRegion
}

export default function CategoryProductGrid({
  category,
  region,
}: CategoryProductGridProps) {
  if (!category.products || category.products.length === 0) {
    return null
  }

  // Show only first 6 products in the grid, rest can be viewed in category page
  const displayProducts = category.products.slice(0, 6)

  return (
    <div className="category-section">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Text className="txt-xlarge-plus font-semibold text-ui-fg-base">
            {category.name}
          </Text>
          {category.description && (
            <Text className="txt-base text-ui-fg-subtle mt-2">
              {category.description}
            </Text>
          )}
        </div>
        <InteractiveLink href={`/categories/${category.handle}`}>
          View all {category.products.length} products
        </InteractiveLink>
      </div>

      <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {displayProducts.map((product) => (
          <div key={product.id}>
            <ProductPreview product={product} region={region} />
          </div>
        ))}
      </div>

      {category.products.length > 6 && (
        <div className="text-center mt-8">
          <InteractiveLink href={`/categories/${category.handle}`}>
            View {category.products.length - 6} more products
          </InteractiveLink>
        </div>
      )}
    </div>
  )
}
