"use client"

import type React from "react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Users, Play } from "lucide-react"

interface OngoingLive {
  id: string
  title: string
  description: string
  coverImage: string
  owner: {
    username: string
    profilePicture: string
  }
  viewerCount?: number
}

interface CurrentLiveAreaProps {
  ongoingLive?: OngoingLive
  onClick?: () => void
}

export const CurrentLiveArea: React.FC<CurrentLiveAreaProps> = ({ ongoingLive, onClick }) => {
  if (!ongoingLive) return null

  return (
    <div className="p-4">
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
        <div className="relative">
          <img
            src={ongoingLive.coverImage || "/placeholder.svg"}
            alt={ongoingLive.title}
            className="w-full h-32 object-cover"
          />

          {/* Live badge */}
          <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">● LIVE</Badge>

          {/* Viewer count */}
          {ongoingLive.viewerCount && (
            <div className="absolute top-3 right-3 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
              <Users className="h-3 w-3 text-white" />
              <span className="text-xs text-white">{ongoingLive.viewerCount}</span>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/30 rounded-full p-2">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        </div>

        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <img
              src={ongoingLive.owner.profilePicture || "/placeholder.svg"}
              alt={ongoingLive.owner.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-900 truncate">{ongoingLive.title}</h4>
              <p className="text-xs text-gray-600">{ongoingLive.owner.username}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
