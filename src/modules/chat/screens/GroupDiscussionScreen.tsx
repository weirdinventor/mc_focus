"use client"

import { ArrowLeft, MessageCircle, Users } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetResourcesByGroupIdQuery } from "../../../react-query/queries/feed/feedQueries"
import { useGetDiscussionByIdQuery } from "../../../react-query/queries/chat/chatQueries"
import { useJoinVoiceRoomMutation } from "../../../react-query/queries/stream/streamMutations"
import { RootStackRoutes } from "../../../navigators/routes"

interface GroupDiscussion {
  id: string
  name: string
  coverImage?: string
  thumbnail?: string
  members?: number
}

interface GroupDiscussionScreenProps {
  discussion?: GroupDiscussion
  isPending?: boolean
  isError?: boolean
  onBack?: () => void
  onNavigateToChat?: (params: {
    title: string
    conversationId: string
    isGroup: boolean
  }) => void
  onJoinVoiceRoom?: (groupId: string) => void
}

export const GroupDiscussionScreen: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as { groupId?: string; voiceRoomId?: string };
  const { mutate } = useJoinVoiceRoomMutation();
  const groupId = state.groupId ?? '0';
  const {
    data: discussion,
    isPending,
    isError,
  } = useGetDiscussionByIdQuery({
    id: groupId,
  });

  const voiceRoomId = state.voiceRoomId;
  const { data: resources } = useGetResourcesByGroupIdQuery({ groupId });

  const navigate = useNavigate();

  const onVocalChannelPress = () => {
    // if (voiceRoomId && onJoinVoiceRoom) {
    //   onJoinVoiceRoom(groupId)
    // }
  }

  const onDiscussionPress = () => {
    if (discussion) {
      navigate(RootStackRoutes.CHAT_SCREEN, {
        state: {
          title: discussion.name,
          conversationId: discussion.id,
          isGroup: true,
        },
      })
    }
  }

  if (isPending || isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header with Group Info */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={() =>  navigate(-1)} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-white text-lg lg:text-xl font-semibold truncate">{discussion.name}</h1>
                {discussion.members && (
                  <p className="text-purple-200 text-sm">{discussion.members} members</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Options */}
      <div className="px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
            <div
              onClick={onDiscussionPress}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Text Chat</h3>
              <p className="text-gray-600 text-sm text-center">Join the group conversation</p>
            </div>

            {/* {voiceRoomId && (  TODO : UPDATE THIS LATER */}
              <div
                onClick={onVocalChannelPress}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 mx-auto">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Voice Channel</h3>
                <p className="text-gray-600 text-sm text-center">Join the voice discussion</p>
              </div>
            {/* )} */}
          </div>

          {/* Resources Section */}
          {resources.length > 0 && (
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
                    <h4 className="font-medium text-sm lg:text-base text-gray-900 mb-1 line-clamp-1">{resource.title}</h4>
                    {resource.description && (
                      <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                    )}
                    <iframe 
                    src={resource.url}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin">
                    </iframe>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            <div className="w-6 h-6 bg-purple-600 rounded mb-1"></div>
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