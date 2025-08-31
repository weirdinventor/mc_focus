"use client"

import { Users, ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

interface DiscussionHeaderProps {
  coverImage?: string
  title?: string
  membersCount?: number
  onBack?: () => void // Added onBack prop for navigation
}

export function DiscussionHeader({ coverImage, title, membersCount, onBack }: DiscussionHeaderProps) {
  return (
    <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden mb-6">
      {coverImage && <img src={coverImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-white text-xl font-bold mb-2">{title}</h1>
        {membersCount && (
          <div className="flex items-center gap-2 text-white/80">
            <Users className="h-4 w-4" />
            <span className="text-sm">{membersCount} members</span>
          </div>
        )}
      </div>
    </div>
  )
}
