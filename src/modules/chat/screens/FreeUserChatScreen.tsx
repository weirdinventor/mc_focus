"use client"

import type React from "react"

import { ArrowLeft, Send } from "lucide-react"
import { useState } from "react"
type FreeUserGroupsTypes = "reglement" | "presentation" | "vosChiffres" | "temoi"

interface FreeUserTexts {
  title: string
  boldText: string
  smallText: string
}

const DATA: Record<FreeUserGroupsTypes, FreeUserTexts> = {
  reglement: {
    title: "Règlement",
    boldText: "Présentation",
    smallText: "Présentation",
  },
  presentation: {
    title: "Présentation", 
    boldText: "Présentation",
    smallText: "Présentation",
  },
  vosChiffres: {
    title: "Vos Chiffres",
    boldText: "Présentation",
    smallText: "Présentation",
  },
  temoi: {
    title: "Témoignages",
    boldText: "Présentation",
    smallText: "Présentation",
  },
}

interface FreeUserChatScreenProps {
  params: { type: FreeUserGroupsTypes }
  onBack?: () => void
}

export const FreeUserChatScreen: React.FC<FreeUserChatScreenProps> = ({ params, onBack }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      username: "Moulaclub",
      text: "Règlement de Moulaclub 📜 \n\nBienvenue sur Moulaclub, la plateforme de communication et de ressources pour les professionnels engagés et les entreprises dynamiques ! 👋 \n\nPour garantir un environnement productif et respectueux, tous les membres sont priés de respecter les règles suivantes :\n\n*Reglement*",
      isOwn: false,
    },
  ])

  const { type } = params

  if (!type || !(type in DATA)) {
    return <div>Invalid type</div>
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          username: "You",
          text: message,
          isOwn: true,
        },
      ])
      setMessage("")
    }
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <h1 className="text-white text-lg lg:text-xl font-semibold truncate">{DATA[type].title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-lg px-4 py-3 rounded-lg ${
                msg.isOwn 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              }`}>
                {!msg.isOwn && (
                  <p className="text-xs text-gray-500 mb-1 font-medium">{msg.username}</p>
                )}
                <p className="text-sm lg:text-base whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4 lg:p-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 lg:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 lg:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

