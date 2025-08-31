import { useState } from "react"
import { AnoncesContentScreen } from "./AnoncesContentScreen"
import { ChatScreen } from "./ChatScreen"
import { DiscussionsScreen } from "./DiscussionsScreen"
import { MessagesListScreen } from "./MessagesListScreen"
import { FreeUserChatScreen } from "./FreeUserChatScreen"
import { ResourcesContentScreen } from "./ResourcesContentScreen"
import { GroupDiscussionScreen } from "./GroupDiscussionScreen"
import { OtherUser } from "../../../core/domain/entities/OtherUser"

// Types for navigation parameters
interface ChatParams {
  title: string
  participant?: OtherUser
  conversationId?: string
  isGroup?: boolean
}

export default function DisplayChatScreens() {
  const [currentScreen, setCurrentScreen] = useState<string>("discussions")
  const [chatParams, setChatParams] = useState<ChatParams | null>(null)

  // Navigation handlers
  const handleNavigateToChat = (params: ChatParams) => {
    setChatParams(params)
    setCurrentScreen("chat")
  }

  const handleNavigateToGroup = (groupId: string, voiceRoomId?: string) => {
    setCurrentScreen("group")
    // Store group params if needed for group-specific functionality
  }

  const handleBack = () => {
    // Reset chat params when going back
    if (currentScreen === "chat") {
      setChatParams(null)
    }
    setCurrentScreen("discussions")
  }

  const handleJoinVoiceRoom = (groupId: string) => {
    // Implement voice room joining logic here
    console.log("Joining voice room for group:", groupId)
    // This could open a modal, navigate to a voice component, etc.
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "anonces":
        return (
          <AnoncesContentScreen 
            params={{ groupId: "1" }} 
            onBack={handleBack}
          />
        )
      
      case "chat":
        return (
          <ChatScreen 
            params={{
              title: chatParams?.title || "Chat",
              participant: chatParams?.participant,
              conversationId: chatParams?.conversationId,
              isGroup: chatParams?.isGroup || false
            }}
            onBack={handleBack}
          />
        )
      
      case "discussions":
        return (
          <DiscussionsScreen 
            onNavigateToGroup={handleNavigateToGroup}
          />
        )
      
      case "messages":
        return (
          <MessagesListScreen 
            onNavigateToChat={handleNavigateToChat}
            onBack={handleBack}
          />
        )
      
      case "resources":
        return (
          <ResourcesContentScreen 
            params={{ groupId: "1" }} 
            onBack={handleBack}
          />
        )
      
      case "freeuser":
        return (
          <FreeUserChatScreen 
            params={{ type: "reglement" }} 
            onBack={handleBack}
          />
        )
      
      case "group":
        return (
          <GroupDiscussionScreen 
            params={{ groupId: "1", voiceRoomId: "voice1" }} 
            onBack={handleBack}
            onNavigateToChat={handleNavigateToChat}
            onJoinVoiceRoom={handleJoinVoiceRoom}
          />
        )
      
      default:
        return <DiscussionsScreen onNavigateToGroup={handleNavigateToGroup} />
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="mb-4 p-4 bg-gray-100 flex gap-2 flex-wrap justify-center">
        <button 
          onClick={() => setCurrentScreen("discussions")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "discussions" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Discussions
        </button>
        <button 
          onClick={() => setCurrentScreen("messages")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "messages" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Messages
        </button>
        <button 
          onClick={() => {
            // Navigate to a demo chat with proper OtherUser structure
            handleNavigateToChat({
              title: "John Doe",
              participant: { 
                id: "user1", 
                username: "John Doe",
                createdAt: new Date().toISOString(), // Required for OtherUser
                profilePicture: "/user1.jpg" // Optional
              },
              conversationId: "conv1",
              isGroup: false
            })
          }}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "chat" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Chat
        </button>
        <button 
          onClick={() => setCurrentScreen("group")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "group" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Group
        </button>
        <button 
          onClick={() => setCurrentScreen("anonces")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "anonces" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Announcements
        </button>
        <button 
          onClick={() => setCurrentScreen("resources")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "resources" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Resources
        </button>
        <button 
          onClick={() => setCurrentScreen("freeuser")}
          className={`px-3 py-2 rounded text-xs lg:text-sm text-blue-900 ${currentScreen === "freeuser" ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Free User
        </button>
      </div>
      {renderScreen()}
    </div>
  )
}