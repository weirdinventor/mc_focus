"use client"

import { ArrowLeft, MessageCircle, Search } from "lucide-react"
import { useState } from "react"

interface Conversation {
  id: string
  participant: {
    username: string
    profilePicture?: string
  }
  latestMessage?: {
    text: string
  }
}

interface MessagesListScreenProps {
  conversations?: Conversation[]
  isPending?: boolean
  onNavigateToChat?: (params: {
    title: string
    conversationId: string
    participant: any
  }) => void
  onRefresh?: () => void
  isRefreshing?: boolean
  onBack?: () => void
}

export const MessagesListScreen: React.FC<MessagesListScreenProps> = ({
  conversations = [
    {
      id: "1",
      participant: { username: "john_doe", profilePicture: "/user1.jpg" },
      latestMessage: { text: "Hey, how are you?" }
    },
    {
      id: "2", 
      participant: { username: "jane_smith", profilePicture: "/user2.jpg" },
      latestMessage: { text: "Thanks for the help!" }
    },
    {
      id: "3",
      participant: { username: "mike_wilson", profilePicture: "/user3.jpg" },
      latestMessage: { text: "See you tomorrow" }
    }
  ],
  isPending = false,
  onNavigateToChat,
  onBack,
}) => {
  const [searchValue, setSearchValue] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.username.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="px-4 lg:px-8 py-3 lg:py-4" style={{background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)'}}>
        <div className="mx-auto">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button onClick={onBack} className="text-white hover:bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] p-2 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}
            <h1 className="text-white text-xl lg:text-2xl font-semibold">Messages</h1>
          </div>
        </div>
      </div>

      {/* Messages Content */}
      <div className="flex-1 flex flex-col">
        {!conversations.length && !isPending ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500">Start a conversation to see your messages here</p>
          </div>
        ) : (
          <div className="px-4 lg:px-8 py-4 lg:py-6 flex-1">
            <div className="mx-auto">
              <div className="space-y-3">
                {filteredConversations.map((conv, i) => (
                  <div
                    key={conv.id}
                    onClick={() =>
                      onNavigateToChat?.({
                        title: conv.participant.username,
                        conversationId: conv.id,
                        participant: conv.participant,
                      })
                    }
                    className={`flex items-center p-4 lg:p-6 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                      i % 2 === 0 ? "border-l-4 border-l-[#E79C1C]" : ""
                    }`}
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-gray-600 font-medium text-sm lg:text-base">
                        {conv.participant.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                          {conv.participant.username}
                        </h3>
                        {i % 2 === 0 && <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-gray-600 text-xs lg:text-sm truncate">
                        {conv.latestMessage?.text || "No messages yet"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="p-4 lg:p-6 border-t bg-white fixed w-screen bottom-0">
          <div className="mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search conversations..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
              />
            </div>
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
            <span className="text-xs text-purple-600 font-medium">Chat</span>
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

