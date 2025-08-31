"use client"

import { Button } from "../ui/button"
import { ArrowLeft, Search } from "lucide-react"

interface SmallHeaderProps {
  title: string
  withSearch?: boolean
  onBack?: () => void
}

export function SmallHeader({ title, withSearch = true, onBack }: SmallHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {withSearch && (
        <Button variant="ghost" size="sm">
          <Search className="h-4 w-4" />
        </Button>
      )}
    </header>
  )
}
