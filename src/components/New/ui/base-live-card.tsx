"use client"

import type React from "react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Play, Users, Clock, Lock } from "lucide-react"

interface BaseLiveCardProps {
  id: string
  profilePicture: string
  coverPicture: string
  type: "live" | "soon" | "rebroadcast"
  subscriptionRequired?: boolean
  title: string
  description: string
  author: string
  timeAgo?: number
  startsIn?: string
  peopleAmount?: number
  videoUrl?: string
  onClick?: () => void
}

export const BaseLiveCard: React.FC<BaseLiveCardProps> = ({
  id,
  profilePicture,
  coverPicture,
  type,
  subscriptionRequired = false,
  title,
  description,
  author,
  timeAgo,
  startsIn,
  peopleAmount,
  videoUrl,
  onClick,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case "live":
        return "bg-red-500"
      case "soon":
        return "bg-orange-500"
      case "rebroadcast":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeText = () => {
    switch (type) {
      case "live":
        return "LIVE"
      case "soon":
        return "SOON"
      case "rebroadcast":
        return "REPLAY"
      default:
        return ""
    }
  }

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="relative">
        <img src={coverPicture || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />

        {/* Type badge */}
        <Badge className={`absolute top-3 left-3 ${getTypeColor()} text-white`}>{getTypeText()}</Badge>

        {/* Subscription required */}
        {subscriptionRequired && (
          <div className="absolute top-3 right-3 bg-black/70 rounded-full p-1">
            <Lock className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Play button for rebroadcast */}
        {type === "rebroadcast" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={profilePicture || "/placeholder.svg"}
            alt={author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>
            <p className="text-sm font-medium text-gray-800 mb-2">{author}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              {startsIn && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{startsIn}</span>
                </div>
              )}

              {peopleAmount && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{peopleAmount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
