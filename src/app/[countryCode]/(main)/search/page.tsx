import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Text, Heading } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { SearchParams } from "next/navigation"

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<SearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams
  const query = searchParams.q || ""

  return {
    title: query ? `Search Results for "${query}" - Kamisha` : "Search - Kamisha",
    description: `Search results for "${query}" on Kamisha. Find your perfect modest fashion items.`,
  }
}

export default async function SearchPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const query = searchParams.q

  if (!query) {
    notFound()
  }

  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // Search products by query
  const { response: { products, count } } = await listProducts({
    regionId: region.id,
    queryParams: {
      q: query as string,
      limit: 50,
      fields: "*variants.calculated_price",
    },
  })

  return (
    <div className="content-container py-8">
      {/* Search Header */}
      <div className="mb-8">
        <Heading level="h1" className="text-3xl font-bold mb-2">
          Search Results
        </Heading>
        <Text className="text-ui-fg-subtle">
          {count} result{count !== 1 ? "s" : ""} for "{query}"
        </Text>
      </div>

      {/* Search Results */}
      {count > 0 ? (
        <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((product) => (
            <div key={product.id}>
              <ProductPreview product={product} region={region} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Text className="text-xl text-ui-fg-subtle mb-4">
            No products found for "{query}"
          </Text>
          <Text className="text-ui-fg-subtle">
            Try adjusting your search terms or browse our collections
          </Text>
        </div>
      )}

      {/* Search Suggestions */}
      {count === 0 && (
        <div className="mt-16 p-6 bg-ui-bg-subtle rounded-lg">
          <Heading level="h2" className="text-xl font-semibold mb-4">
            Popular Searches
          </Heading>
          <div className="flex flex-wrap gap-2">
            {["abaya", "hijab", "dress", "modest", "islamic"].map((term) => (
              <a
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-2 bg-white rounded-full text-sm text-ui-fg-base hover:text-ui-fg-interactive transition-colors"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
