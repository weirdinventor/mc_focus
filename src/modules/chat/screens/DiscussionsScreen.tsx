import { ArrowLeft, MessageCircle, Search, Users } from "lucide-react";
import { useGetDiscussionsQuery } from "../../../react-query/queries/chat/chatQueries";
import { useNavigate } from "react-router-dom";
import { RootStackRoutes } from "../../../navigators/routes";

interface DiscussionsScreenProps {
  onNavigateToGroup?: (groupId: string, voiceRoomId?: string) => void
  onBack?: () => void
}


export const DiscussionsScreen: React.FC<DiscussionsScreenProps> = ({
  onNavigateToGroup,
  onBack
}) => {
  const { data: discussions } = useGetDiscussionsQuery();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button onClick={onBack} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              )}
              <h1 className="text-white text-xl lg:text-2xl font-semibold">Discussions</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Discussions Content */}
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          {!discussions.length ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Users className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h3>
              <p className="text-gray-500">Join conversations with your community</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">DISCUSSIONS</h2>
                <p className="text-gray-600">Join conversations with your community</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {discussions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(RootStackRoutes.GROUP_DISCUSSION_SCREEN, {
                        state: { 
                          groupId: item.id,
                          voiceRoomId: item.voiceRoomId, 
                        },
                      })
                    }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="relative h-32 lg:h-40 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                      {item.voiceRoomId && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                          VOICE
                        </div>
                      )}
                      <Users className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base line-clamp-1">{item.name}</h3>
                      {item.members && (
                        <p className="text-gray-500 text-xs lg:text-sm flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {item.members} members
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};