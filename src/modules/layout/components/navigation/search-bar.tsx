"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp, Clock, Sparkles } from "lucide-react"
import { Button, Input, Text } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock trending searches for fashion
  const trendingSearches = [
    "Abaya Collection",
    "Modest Dresses",
    "Hijab Styles",
    "Islamic Fashion",
    "Ramadan Collection"
  ]

  // Mock recent searches
  const recentSearches = [
    "Black Abaya",
    "Summer Hijab",
    "Modest Swimwear"
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsExpanded(false)
      setSearchQuery("")
      setShowSuggestions(false)
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
    setShowSuggestions(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const handleSearchClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setIsExpanded(false)
    setSearchQuery("")
    setShowSuggestions(false)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isExpanded) {
    return (
      <Button
        variant="transparent"
        size="small"
        onClick={handleExpand}
        className="p-2 hover:bg-ui-bg-subtle rounded-lg transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search for abayas, hijabs, modest fashion..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          className="pr-20 rounded-lg border-ui-border-base focus:border-ui-border-interactive"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <Button
            type="submit"
            variant="transparent"
            size="small"
            className="p-1 hover:bg-ui-bg-subtle rounded"
            disabled={!searchQuery.trim()}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="transparent"
            size="small"
            onClick={handleCollapse}
            className="p-1 hover:bg-ui-bg-subtle rounded"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-ui-border-base rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3 border-b border-ui-border-base">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-ui-fg-subtle" />
                <Text className="text-sm font-medium text-ui-fg-subtle">Recent Searches</Text>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchClick(search)}
                    className="w-full text-left px-2 py-1 text-sm text-ui-fg-base hover:bg-ui-bg-subtle rounded transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-ui-fg-subtle" />
              <Text className="text-sm font-medium text-ui-fg-subtle">Trending</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchClick(search)}
                  className="px-3 py-1 text-xs bg-ui-bg-subtle text-ui-fg-base rounded-full hover:bg-ui-bg-base transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="p-3 border-t border-ui-border-base bg-ui-bg-subtle">
            <Text className="text-sm font-medium text-ui-fg-subtle mb-2">Quick Categories</Text>
            <div className="grid grid-cols-2 gap-2">
              <LocalizedClientLink
                href="/collections/abayas"
                className="p-2 bg-white rounded text-center text-sm text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
                onClick={() => setShowSuggestions(false)}
              >
                Abayas
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/hijabs"
                className="p-2 bg-white rounded text-center text-sm text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
                onClick={() => setShowSuggestions(false)}
              >
                Hijabs
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections/dresses"
                className="p-2 bg-white rounded text-center text-sm text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
                onClick={() => setShowSuggestions(false)}
              >
                Dresses
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/sale"
                className="p-2 bg-white rounded text-center text-sm text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
                onClick={() => setShowSuggestions(false)}
              >
                Sale
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
