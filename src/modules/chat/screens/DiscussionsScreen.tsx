import React from 'react';
import { ArrowLeft, Search, Mail, Home, Video, MessageCircle, GraduationCap, User } from "lucide-react";
import { useGetDiscussionsQuery } from '../../../react-query/queries/chat/chatQueries';
import { useNavigate } from 'react-router-dom';
import { RootStackRoutes } from '../../../navigators/routes';

interface DiscussionsScreenProps {
  onNavigateToGroup?: (groupId: string, voiceRoomId?: string) => void
  onBack?: () => void
}

export const DiscussionsScreen: React.FC<DiscussionsScreenProps> = ({
  onNavigateToGroup,
  onBack
}) => {
  

  const navigate = useNavigate()
  const { data: discussions } = useGetDiscussionsQuery();

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Gradient */}
        <div className="relative h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
          {/* Decorative background image placeholder */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 opacity-20">
            <div className="w-full h-full bg-white/10 rounded-full"></div>
          </div>
          
          {/* Top Navigation Bar */}
          <div className="relative px-8 py-4">
            <div className="flex items-center justify-between mx-auto">
              <div className="flex items-center space-x-4 opacity-0">
                <ArrowLeft className="w-6 h-6 text-white" />
                <span className="text-white text-xl font-bold uppercase tracking-wider">nom</span>
              </div>
              <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.SEARCH_SCREEN)}/>
                <Mail className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.MESSAGES_LIST_SCREEN)}/>
              </div>
            </div>
          </div>

          {/* Main Title Section */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
            <div className="text-left">
              <h1 className="text-white text-3xl font-black uppercase mb-4 tracking-wider" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                DISCUSSIONS
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-8 py-8 mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {discussions.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  navigate(RootStackRoutes.GROUP_DISCUSSION_SCREEN, {
                    state: { 
                      groupId: category.id,
                      voiceRoomId: category.voiceRoomId, 
                    },
                  })
                }}
                className="group relative w-128 h-44 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Background with gradient and overlay effects */}
                <div className={`absolute inset-0 bg-gradient-to-br `} style={{ backgroundImage: `url(${category.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {/* Overlay gradients for depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/20 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/30 via-gray-500/20 to-gray-400/30 mix-blend-normal"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-between p-8">
                  {/* Category Name */}
                  <div className="z-10">
                    <h3 className="text-white text-2xl font-black uppercase tracking-wide drop-shadow-lg">
                      {category.name}
                    </h3>
                    {category.members && (
                      <p className="text-white/80 text-sm mt-1">{category.members.toLocaleString()}</p>
                    )}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};