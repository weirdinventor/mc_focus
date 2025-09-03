"use client"

import type React from "react"
import { ArrowLeft, Search, MessageCircle, MoreHorizontal, Clock } from "lucide-react"

// AnoncesContentScreen Component
interface Live {
  id: string
  title: string
  description: string
  coverImage: string
  accessLevel: "free" | "premium"
  airsAt: string
  owner: {
    username: string
    profilePicture: string
  }
}

interface AnoncesContentScreenProps {
  params: { groupId: string }
  futureLives?: Live[]
  onBack?: () => void
}

export const AnoncesContentScreen: React.FC<AnoncesContentScreenProps> = ({ 
  futureLives = [
    {
      id: "1",
      title: "Important Announcement",
      description: "New platform updates and features coming soon",
      coverImage: "/announce1.jpg",
      accessLevel: "free" as const,
      airsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      owner: { username: "AdminTeam", profilePicture: "/admin.jpg" }
    },
    {
      id: "2", 
      title: "Community Guidelines Update",
      description: "Please review the updated community guidelines",
      coverImage: "/announce2.jpg",
      accessLevel: "premium" as const,
      airsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      owner: { username: "ModeratorTeam", profilePicture: "/mod.jpg" }
    }
  ],
  onBack 
}) => {
  const calculateTimeLeft = (airsAt: string) => {
    const now = new Date()
    const airTime = new Date(airsAt)
    const diff = airTime.getTime() - now.getTime()

    if (diff <= 0) return "Started"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-white hover:bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <h1 className="text-white text-xl lg:text-2xl font-semibold">Announcements</h1>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Content */}
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {futureLives.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Announcement Image */}
                <div className="relative h-48 lg:h-56 bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {calculateTimeLeft(item.airsAt)}
                  </div>
                  {item.accessLevel === "premium" && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      PREMIUM
                    </div>
                  )}
                  <MessageCircle className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>

                {/* Content */}
                <div className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-gray-600 text-sm lg:text-base font-medium">
                          {item.owner.username.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-900 font-medium text-sm lg:text-base truncate">{item.owner.username}</p>
                        <p className="text-gray-500 text-xs lg:text-sm">Starts in {calculateTimeLeft(item.airsAt)}</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm line-clamp-2">{item.description}</p>
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
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded mb-1"></div>
            <span className="text-xs text-[#E79C1C] font-medium">Chat</span>
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
