"use client"

import { Card, CardContent } from "../ui/card"

interface DiscussionCardProps {
  name: string
  coverImage?: string
  onPress: () => void
}

export function DiscussionCard({ name, coverImage, onPress }: DiscussionCardProps) {
  return (
    <Card className="w-full h-24 cursor-pointer hover:bg-accent transition-colors" onClick={onPress}>
      <CardContent className="flex items-center gap-4 p-4 h-full">
        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          {coverImage && (
            <img src={coverImage || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          )}
        </div>
        <h3 className="font-medium">{name}</h3>
      </CardContent>
    </Card>
  )
}
