import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import CategoryProductGrid from "./category-product-grid"

export default async function ProductsByCategory({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const categories = await listCategories({
    limit: 6,
    fields: "id, name, handle, description",
  })

  if (!categories || categories.length === 0) {
    return null
  }

  // Get products for each category
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      try {
        const { response: { products } } = await listProducts({
          regionId: region.id,
          queryParams: {
            category_id: [category.id],
            limit: 8,
            fields: "*variants.calculated_price",
          },
        })

        return {
          ...category,
          products: products || [],
        }
      } catch (error) {
        console.error(`Error fetching products for category ${category.name}:`, error)
        return {
          ...category,
          products: [],
        }
      }
    })
  )

  // Filter out categories with no products
  const validCategories = categoriesWithProducts.filter(
    (category) => category.products.length > 0
  )

  if (validCategories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-ui-bg-subtle">
      <div className="content-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl small:text-4xl font-bold text-ui-fg-base mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-ui-fg-subtle max-w-2xl mx-auto">
            Discover our curated collections organized by category. Find exactly what you're looking for.
          </p>
        </div>

        <div className="space-y-20">
          {validCategories.map((category) => (
            <CategoryProductGrid
              key={category.id}
              category={category}
              region={region}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
