import React from 'react';
import { ArrowLeft, Search, Mail, Clock, Users, Play } from "lucide-react";
import { RootStackRoutes } from '../../../navigators/routes';
import { useNavigate } from 'react-router-dom';

interface LiveScreenProps {
  onBack?: () => void
}

export const LiveScreen: React.FC<LiveScreenProps> = ({ onBack }) => {
  // Mock data for live streams
  const currentLive = {
    id: '1',
    title: 'LE MEILLEUR BUSINESS PLAN POUR 2024 POUR DÉBUTER EN LIGNE',
    presenter: 'George Bills',
    role: 'SEO de Moulaclub',
    viewers: 1395,
    thumbnail: 'https://images.unsplash.com/photo-1755147047179-76e345776a1e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  const upcomingLives = [
    {
      id: '1',
      duration: '30min',
      interested: 395,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      description: 'Venez rencontrer notre CEO, on ne vous le présentera plus ! Il répondra à toutes vos questions concernant le business en ligne ⌚😍',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '2', 
      duration: '30min',
      interested: 395,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      description: 'Venez rencontrer notre CEO, on ne vous le présentera plus ! Il répondra à toutes vos questions concernant le business en ligne ⌚😍',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '3',
      duration: '30min', 
      interested: 395,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      description: 'Venez rencontrer notre CEO, on ne vous le présentera plus ! Il répondra à toutes vos questions concernant le business en ligne ⌚😍',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '4',
      duration: '30min',
      interested: 395, 
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      description: 'Venez rencontrer notre CEO, on ne vous le présentera plus ! Il répondra à toutes vos questions concernant le business en ligne ⌚😍',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    }
  ];

  const replays = [
    {
      id: '1',
      viewers: 1985,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '2',
      viewers: 1985,
      presenter: 'George', 
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '3',
      viewers: 1985,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse', 
      participants: 2,
      timeLeft: 'Il y a 7 heures'
    },
    {
      id: '4',
      viewers: 1985,
      presenter: 'George',
      title: 'Business rentable : au cœur du monde de l\'Horlogerie luxueuse',
      participants: 2, 
      timeLeft: 'Il y a 7 heures'
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
        {/* Top Navigation Bar */}
        <div className="relative px-8 py-4">
          <div className="flex items-center justify-between mx-auto">
            <div className="flex items-center space-x-4">
              <span className="text-white text-xl font-bold uppercase tracking-wider">LIVE</span>
            </div>
            <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.SEARCH_SCREEN)}/>
                <Mail className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.MESSAGES_LIST_SCREEN)}/>
              </div>
          </div>
        </div>

        {/* Current Live Section */}
        <div className="px-8 pb-6">
          <div className="mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold">LIVE EN COURS</span>
              <div className="ml-auto flex items-center space-x-2">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{currentLive.viewers}</span>
              </div>
            </div>

            <div className="bg-black text-left rounded-xl overflow-hidden relative h-80">
              <img 
                src={currentLive.thumbnail} 
                alt={currentLive.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-white text-3xl font-black uppercase mb-4 leading-tight" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                  {currentLive.title}
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">G</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Par {currentLive.presenter}</p>
                      <p className="text-white/80 text-sm">{currentLive.role}</p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] hover:bg-purple-700 text-purple px-6 py-2 rounded-full font-semibold transition-colors">
                    👀 Regarder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-8 py-8 mx-auto">
        {/* Upcoming Lives Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-900">LIVES À VENIR</h2>
              <span className="text-xl">🔥</span>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-semibold">VOIR TOUT</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingLives.map((live) => (
              <div key={live.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-900 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1755147047179-76e345776a1e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Live preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{live.duration}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{live.interested} intéressés</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">G</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{live.presenter}, <span className="text-gray-500 font-normal">Founder</span></p>
                      <p className="text-gray-500 text-xs">{live.timeLeft}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{live.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-3">{live.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-gray-400 rounded-full border border-white"></div>
                        <div className="w-5 h-5 bg-gray-500 rounded-full border border-white"></div>
                      </div>
                      <span className="text-xs text-gray-500">{live.participants} participant</span>
                    </div>
                    <button className="bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] hover:bg-purple-700 text-purple px-4 py-1.5 rounded-full text-xs font-semibold transition-colors">
                      ⏰ M'alerter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replays Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-900">REDIFFUSIONS</h2>
              <span className="text-xl">🎬</span>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-semibold">VOIR TOUT</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {replays.map((replay) => (
              <div key={replay.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-900 relative overflow-hidden group cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1755147047179-76e345776a1e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Replay preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      Rediffusion
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{replay.viewers}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">G</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{replay.presenter}, <span className="text-gray-500 font-normal">Founder</span></p>
                      <p className="text-gray-500 text-xs">{replay.timeLeft}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">{replay.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-gray-400 rounded-full border border-white"></div>
                        <div className="w-5 h-5 bg-gray-500 rounded-full border border-white"></div>
                      </div>
                      <span className="text-xs text-gray-500">{replay.participants} participant</span>
                    </div>
                    <button className="bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-colors">
                      📺 Regarder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
