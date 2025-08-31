import { cn } from "../../../lib/utils"
import type { ReactNode } from "react"

interface WrapperProps {
  children: ReactNode
  className?: string
  noHorizontalPadding?: boolean
  withoutTopEdge?: boolean
  fullscreen?: boolean
  containerStyles?: string
}

export function Wrapper({
  children,
  className,
  noHorizontalPadding = false,
  withoutTopEdge = false,
  fullscreen = false,
  containerStyles,
  ...props
}: WrapperProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        !noHorizontalPadding && "px-6",
        !withoutTopEdge && "pt-4",
        fullscreen && "h-screen",
        containerStyles,
        className,
      )}
    >
      {children}
    </div>
  )
}
