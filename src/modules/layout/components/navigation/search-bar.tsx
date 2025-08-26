"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button, Input } from "@medusajs/ui"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsExpanded(false)
      setSearchQuery("")
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    setSearchQuery("")
  }

  if (!isExpanded) {
    return (
      <Button
        variant="transparent"
        size="small"
        onClick={handleExpand}
        className="p-2 hover:bg-ui-bg-subtle"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <div className="relative flex-1 max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <Button
            type="submit"
            variant="transparent"
            size="small"
            className="p-1 hover:bg-ui-bg-subtle"
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
            className="p-1 hover:bg-ui-bg-subtle"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
