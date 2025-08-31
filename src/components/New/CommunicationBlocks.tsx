"use client"

import { Button } from "./ui/button"
import { MessageCircle, Mic } from "lucide-react"

interface CommunicationBlocksProps {
  onDiscussionPress: () => void
  onVocalPress: () => void
}

export function CommunicationBlocks({ onDiscussionPress, onVocalPress }: CommunicationBlocksProps) {
  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={onDiscussionPress}
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-2 bg-card hover:bg-accent"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Discussion</span>
        </Button>

        <Button
          onClick={onVocalPress}
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-2 bg-card hover:bg-accent"
        >
          <Mic className="h-6 w-6" />
          <span className="text-sm font-medium">Voice Channel</span>
        </Button>
      </div>
    </div>
  )
}
