"use client"

import { MessageCircle, MoreHorizontal, Play, Search, Users } from "lucide-react"
import type React from "react"

interface Live {
  id: string
  title: string
  description: string
  coverImage: string
  accessLevel: "free" | "premium"
  owner: {
    username: string
    profilePicture: string
  }
}

interface CurrentContentScreenProps {
  currentLives?: Live[]
}

export const CurrentContentScreen: React.FC<CurrentContentScreenProps> = ({ 
  currentLives = [
    {
      id: "1",
      title: "Trading Masterclass",
      description: "Learn advanced trading strategies and market analysis techniques",
      coverImage: "/placeholder.jpg",
      accessLevel: "premium" as const,
      owner: { username: "TraderPro", profilePicture: "/avatar1.jpg" }
    },
    {
      id: "2", 
      title: "Market Analysis",
      description: "Daily market insights and trends analysis",
      coverImage: "/placeholder.jpg",
      accessLevel: "free" as const,
      owner: { username: "MarketGuru", profilePicture: "/avatar2.jpg" }
    },
    {
      id: "3",
      title: "Crypto Deep Dive",
      description: "Exploring the latest cryptocurrency trends",
      coverImage: "/placeholder.jpg",
      accessLevel: "premium" as const,
      owner: { username: "CryptoKing", profilePicture: "/avatar3.jpg" }
    },
    {
      id: "4",
      title: "Investment Workshop",
      description: "Building a diversified portfolio",
      coverImage: "/placeholder.jpg",
      accessLevel: "free" as const,
      owner: { username: "InvestWise", profilePicture: "/avatar4.jpg" }
    }
  ]
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <h1 className="text-white text-xl lg:text-2xl font-semibold">Live Now</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Content */}
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {currentLives.map((live) => (
              <div key={live.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Cover Image */}
                <div className="relative h-48 lg:h-56 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </div>
                  {live.accessLevel === "premium" && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      PREMIUM
                    </div>
                  )}
                  <Play className="w-16 h-16 lg:w-20 lg:h-20 text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
                </div>

                {/* Content */}
                <div className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-gray-600 text-sm lg:text-base font-medium">
                          {live.owner.username.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-900 font-medium text-sm lg:text-base truncate">{live.owner.username}</p>
                        <p className="text-gray-500 text-xs lg:text-sm">7 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className="flex items-center text-gray-500 text-xs lg:text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        375
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-1">{live.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm line-clamp-2">{live.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden on desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
        <div className="flex justify-around">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Feed</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded mb-1"></div>
            <span className="text-xs text-purple-600 font-medium">Live</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Chat</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Module</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Profil</span>
          </div>
        </div>
      </div>
    </div>
  )
}

