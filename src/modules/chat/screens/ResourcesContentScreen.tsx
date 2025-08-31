"use client"

import { ArrowLeft, MessageCircle, Search } from "lucide-react"
interface Resource {
  id: string
  title: string
  description?: string
  type?: string
}

interface ResourcesContentScreenProps {
  params: { groupId: string }
  resources?: Resource[]
  onBack?: () => void
}

export const ResourcesContentScreen: React.FC<ResourcesContentScreenProps> = ({ 
  resources = [
    { id: "1", title: "Trading Guide", description: "Complete guide to trading", type: "PDF" },
    { id: "2", title: "Market Analysis", description: "Weekly market reports", type: "REPORT" },
    { id: "3", title: "Video Tutorial", description: "How to read charts", type: "VIDEO" },
    { id: "4", title: "Strategy Template", description: "Risk management template", type: "TEMPLATE" }
  ],
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <h1 className="text-white text-xl lg:text-2xl font-semibold">Resources</h1>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Resources Content */}
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {resources.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  {item.type && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                      {item.type}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 text-xs lg:text-sm line-clamp-3">{item.description}</p>
                )}
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
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Chat</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-purple-600 rounded mb-1"></div>
            <span className="text-xs text-purple-600 font-medium">Module</span>
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

