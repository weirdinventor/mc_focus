import type React from "react"
import { ArrowLeft, MessageCircle, MoreHorizontal, Search, Send, Phone, Video } from "lucide-react"
import { useState } from "react"
import { useChat } from "../../../hooks/useChat"
import { useLocation, useNavigate } from "react-router-dom"
import { OtherUser } from "../../../core/domain/entities/OtherUser"


export const ChatScreen: React.FC = () => {

  const location = useLocation();
  const state = (location.state || {}) as { title?: string; conversationId?: string, isGroup?: boolean, participant?: OtherUser };

  const title = state.title ?? '';
  const participant = state.participant ?? undefined;
  const conversationId = state.conversationId ?? undefined;
  const isGroup = state.isGroup ?? false;

  const { onSendMessageHandler, messages } = useChat(
    participant,
    conversationId,
    isGroup,
  );

  const [messageText, setMessageText] = useState("")


  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await onSendMessageHandler(messageText.trim())
      setMessageText("")
    }
  }

  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(29.74deg, #CA82FF -122.6%, #CD80F0 -91.2%, #A61EDF -58.73%, #1C0024 93.9%)' }}>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div className="w-full h-full bg-white/20 rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>

          {/* Header Content */}
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  className="text-purple bg-opacity-10 hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <span className="text-white text-lg font-bold">
                        {title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {!isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h1 className="text-white text-xl font-bold truncate tracking-wide">
                      {title}
                    </h1>
                    <p className="text-white/70 text-sm">
                      {isGroup ? 'Groupe • 2.5k membres' : 'En ligne'}
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center space-x-2">
                {!isGroup && (
                  <>
                    <Phone className="w-6 h-6 text-white cursor-pointer hover:text-white/70 transition-colors p-1" />
                    <Video className="w-6 h-6 text-white cursor-pointer hover:text-white/70 transition-colors p-1" />
                  </>
                )}
                <Search className="w-6 h-6 text-white cursor-pointer hover:text-white/70 transition-colors p-1" />
                <MoreHorizontal className="w-6 h-6 text-white cursor-pointer hover:text-white/70 transition-colors p-1" />
              </div> */}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              {/* 3D Chat Bubble with dots */}
              <div className="relative mb-8">
                <div className="w-32 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl rounded-bl-sm shadow-2xl transform rotate-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-500/20 to-transparent rounded-3xl rounded-bl-sm"></div>
                  <div className="flex items-center justify-center h-full space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gray-400/20 rounded-full blur-sm transform scale-x-110"></div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                Restez à l'affût, les prochains lives arrivent bientôt !
              </h3>
              <p className="text-gray-500 text-lg">
                Activez les notifications pour ne pas manquer les prochains lives !
              </p>
            </div>
          ) : (
            <div className="px-6 py-6 space-y-6 mx-auto w-full">

              {/* Messages */}
              <div className="space-y-4">
                {messages.slice().reverse().map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-4">
                    {/* Date separator - check if section has a date property */}
                    {(section as any).title && (

                      <div className="flex items-center justify-center mb-8">
                        <div className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm font-medium">
                          {(section as any).title}
                        </div>
                      </div>
                    )}

                    {/* Messages in this section */}
                    <div className="space-y-3">
                      {((section as any).data || [section]).slice().reverse().map((message: any) => (
                        <div key={message.id} className={`flex items-start space-x-3 ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!message.isOwn && (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                              <span className="text-white text-sm font-bold">
                                {message.avatar || message.username?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}

                          <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-3xl`}>
                            {!message.isOwn && isGroup && (
                              <span className="text-sm font-semibold text-gray-700 mb-1 px-1">
                                {message.username}
                              </span>
                            )}

                            <div className={`px-4 py-3 rounded-2xl shadow-sm ${message.isOwn
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-sm'
                              : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                              }`}>
                              <p className="text-sm lg:text-base leading-relaxed text-left">
                                {message.text}
                              </p>
                            </div>

                            {message.timestamp && (
                              <span className={`text-xs text-gray-400 mt-1 px-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                                {message.timestamp}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="mx-auto w-full">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200 focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 transition-all">
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 bg-transparent px-2 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}