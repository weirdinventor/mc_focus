"use client"

import { Button } from "../ui/button"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { cn } from "../../../lib/utils"

interface TopHeaderProps {
  text?: string
  type?: "static" | "absolute"
  withBackButton?: boolean
  withMessage?: boolean
  onBack?: () => void
}

export function TopHeader({
  text,
  type = "static",
  withBackButton = false,
  withMessage = true,
  onBack,
}: TopHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 bg-background border-b",
        type === "absolute" && "absolute top-0 left-0 right-0 z-10",
      )}
    >
      <div className="flex items-center gap-3">
        {withBackButton && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        {text && <h1 className="text-lg font-semibold">{text}</h1>}
      </div>
      {withMessage && (
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4" />
        </Button>
      )}
    </header>
  )
}
