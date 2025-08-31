"use client"

import type React from "react"
import { Button } from "./button"
import { ChevronRight } from "lucide-react"

interface FeedCardRowProps<T = any> {
  navigationPath?: string
  data: T[]
  headerTitle: string
  withoutAllButton?: boolean
  renderCard: (item: T) => React.ReactNode
}

export function FeedCardRow<T>({
  navigationPath,
  data,
  headerTitle,
  withoutAllButton = false,
  renderCard,
}: FeedCardRowProps<T>) {
  const handleSeeAll = () => {
    if (navigationPath) {
      console.log("Navigate to:", navigationPath)
      // In a real app, this would use Next.js router
    }
  }

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-seance-500 to-teal-500 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>No content available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-seance-500 to-teal-500 bg-clip-text text-transparent">
          {headerTitle}
        </h2>
        {!withoutAllButton && data.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSeeAll}
            className="text-seance-500 hover:text-seance-600 hover:bg-seance-50"
          >
            See All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="w-full">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  )
}
