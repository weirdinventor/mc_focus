import type React from "react"
import { ArrowLeft, MessageCircle, MoreHorizontal, Search, Send } from "lucide-react"
import { useState } from "react"
import { useChat } from "../../../hooks/useChat"
import { useLocation, useNavigate } from "react-router-dom"
import { OtherUser } from "../../../core/domain/entities/OtherUser"


export const ChatScreen: React.FC = () => {

  const location = useLocation();
  const state = (location.state || {}) as { title?: string; conversationId?: string , isGroup?: boolean, participant?: OtherUser};

  const title = state.title ?? '';
  const participant = state.participant ?? undefined;
  const conversationId = state.conversationId ?? '0';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {title}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-white text-lg lg:text-xl font-semibold truncate">{title}</h1>
                {isGroup && <p className="text-purple-200 text-sm">Group Chat</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MoreHorizontal className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 max-w-4xl mx-auto w-full">
        {!messages.length ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isGroup ? "No messages in this group yet" : `Start a conversation with ${participant?.username || title}`}
            </h3>
            <p className="text-gray-500">Send a message to get the conversation started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.slice().reverse().map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                {/* Date separator - check if section has a date property */}
                {(section as any).title && (
                  <div className="flex items-center justify-center">
                    <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {(section as any).title}
                    </div>
                  </div>
                )}
                
                {/* Messages in this section */}
                <div className="space-y-3">
                  {((section as any).data || [section]).slice().reverse().map((message: any) => (
                    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      }`}>
                        {!message.isOwn && isGroup && (
                          <p className="text-xs text-gray-500 mb-1 font-medium">{message.username}</p>
                        )}
                        <p className="text-sm lg:text-base">{message.text}</p>
                        {message.timestamp && (
                          <p className={`text-xs mt-1 ${message.isOwn ? 'text-purple-200' : 'text-gray-400'}`}>
                            {message.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4 lg:p-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 lg:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="px-4 py-2 lg:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}