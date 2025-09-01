import React from 'react';
import { ArrowLeft, Search, Mail, Clock, Users, Play } from "lucide-react";
import { RootStackRoutes } from '../../../navigators/routes';
import { useNavigate } from 'react-router-dom';
import { CurrentLiveArea } from '../components/ComponentLive/CurrentLiveArea';
import { ComingSoonFeed } from '../components/ComingSoonFeed';


export const LiveScreen: React.FC = () => {

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
        
      </div>

      <CurrentLiveArea />

      {/* Content Sections */}
      <ComingSoonFeed />
    </div>
  );
};
