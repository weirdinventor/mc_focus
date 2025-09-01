import React from 'react';
import { ArrowLeft, Search, Mail, Users, Clock, Mic, MessageCircle } from "lucide-react";
import { RootStackRoutes } from '../../../navigators/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useJoinVoiceRoomMutation } from '../../../react-query/queries/stream/streamMutations';
import { useGetDiscussionByIdQuery } from '../../../react-query/queries/chat/chatQueries';
import { useGetResourcesByGroupIdQuery } from '../../../react-query/queries/feed/feedQueries';
import { announcements } from '../../../mock';


export const GroupDiscussionScreen: React.FC = ({ }) => {

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

  const navigate = useNavigate();

  const onVocalChannelPress = () => {
    if (voiceRoomId) {
      mutate(
        { groupId },
        {
          onSuccess: ({ token }) => {
            navigate(RootStackRoutes.MEETING_SCREEN, {
              state: {
                streamType: 'vocal',
                meetingId: voiceRoomId,
                token: token,
              }
            });
          },
        },
      );
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src='/api/placeholder/800/300'
            alt="E-commerce background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent"></div>
        </div>

        {/* Top Navigation */}
        <div className="relative px-8 py-4 z-10">
          <div className="flex items-center justify-between mx-auto">
            <div className="flex items-center space-x-4">
              <ArrowLeft
                className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <Mail className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>

        {/* Group Info */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 z-10 text-left">
          <div className="mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-sm">{discussion.members} membres</span>

            </div>
            <h1 className="text-white text-4xl font-black uppercase mb-2" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {discussion.name}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              {discussion.name}
            </p>
          </div>
        </div>
      </div>

      {/* Voice Channels */}
      <div className="px-8 py-6 mx-auto">
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div
            onClick={onDiscussionPress}
            className={`relative h-20 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-purple-400 to-purple-500`}
          >
            <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
              <span className="font-semibold text-sm">Text Chat</span>
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>


          {voiceRoomId && (
            <div
              onClick={onVocalChannelPress}
              className={`relative h-20 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-gradient-to-r from-red-400 to-red-500`}
            >
              <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
                <span className="font-semibold text-sm">Voice Channel</span>
                <Mic className="w-6 h-6" />
              </div>
            </div>
          )}

        </div>

        {/* Announcements Section */}
        {/* <AnnouncementsSection /> */}

        {/* Resources Section */}
        <ResourcesSection groupId={groupId} />
      </div>
    </div>
  );
};

const AnnouncementsSection = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">ANNONCES</h2>
        <button className="text-purple-600 hover:text-purple-700 font-semibold">VOIR TOUT</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-900 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1755147047179-76e345776a1e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Announcement preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{announcement.duration}</span>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{announcement.interested} intéressés</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">G</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{announcement.presenter}, <span className="text-gray-500 font-normal">Founder</span></p>
                  <p className="text-gray-500 text-xs">{announcement.timeLeft}</p>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{announcement.title}</h3>
              <p className="text-gray-600 text-xs mb-3 line-clamp-3">{announcement.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-gray-400 rounded-full border border-white"></div>
                    <div className="w-5 h-5 bg-gray-500 rounded-full border border-white"></div>
                  </div>
                  <span className="text-xs text-gray-500">{announcement.participants} participant</span>
                </div>
                <button className="bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] hover:bg-purple-700 text-purple px-4 py-1.5 rounded-full text-xs font-semibold transition-colors">
                  M'alerter
                </button>
              </div>


            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

const ResourcesSection = ({ groupId } : { groupId: string }) => {
  const { data: resources } = useGetResourcesByGroupIdQuery({ groupId });
  console.log('resources', resources);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-900">RESSOURCES</h2>
          <span className="text-xl">📚</span>
        </div>
        <button className="text-purple-600 hover:text-purple-700 font-semibold">VOIR TOUT</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <div className={`h-24 ${true ? 'bg-gray-900' : 'bg-blue-100'} relative overflow-hidden flex items-center justify-center`}>
                {true ? (
                  <div className="text-green-400 text-xs font-mono">
                    {'{ code }'}
                  </div>
                ) : (
                  <div className="text-blue-600 text-xs">
                    📊 Strategy
                  </div>
                )}
                {true && (
                  <div className="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full"></div>
                )}
                <iframe
                  src={resource.url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-xs mb-1 line-clamp-2">{resource.title}</h3>
              <p className="text-gray-500 text-xs mb-2">{resource.description}</p>
              {resource.authorId && (
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">{resource.authorId}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}