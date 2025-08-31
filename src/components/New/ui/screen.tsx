import { cn } from "../../../lib/utils"
import type { ReactNode } from "react"

interface ScreenProps {
  children: ReactNode
  className?: string
  bounces?: boolean
  noHorizontalPadding?: boolean
  fullscreen?: boolean
  headerWithBack?: boolean
}

export function Screen({
  children,
  className,
  noHorizontalPadding = false,
  fullscreen = false,
  ...props
}: ScreenProps) {
  return (
    <div
      className={cn("min-h-screen bg-background", !noHorizontalPadding && "px-6", fullscreen && "h-screen", className)}
    >
      {children}
    </div>
  )
}
