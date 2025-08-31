"use client"

import { type JSX, useEffect, useState } from "react"

// --- Custom/Utility Imports ---
import { ViewerContainer } from "./ViewerContainer"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    <span className="text-lg font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      Joining Meeting...
    </span>
  </div>
)

export const HLSContainer = (): JSX.Element => {
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    // Simulate joining meeting
    const joinTimeout = setTimeout(() => {
      setIsJoined(true)
    }, 2000)

    return () => {
      clearTimeout(joinTimeout)
    }
  }, [])

  return isJoined ? (
    <ViewerContainer />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <LoadingSpinner />
    </div>
  )
}
