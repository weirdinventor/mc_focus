import { DiscussionsScreen } from '../../modules/chat/screens/DiscussionsScreen';
import { FeedScreen } from '../../modules/home/screens/FeedScreen';
import { LiveScreen } from '../../modules/live/screens/LiveScreen';
import { ModuleScreen } from '../../modules/module/screens/ModuleScreen';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';
import { Colors } from '../../constants/Colors';
import { RootStackRoutes, TabBarStackRoutes } from '../routes';
import React, { useState } from 'react';
import { Routes, Route, Outlet, NavLink, Navigate } from 'react-router-dom';
import { useThemeInterpolation } from '../../hooks/useThemeInterpolation';
import { AiOutlineHome } from 'react-icons/ai';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { SlGraduation } from 'react-icons/sl';
import { FiUser } from 'react-icons/fi';
import ImageAssets from '../../assets/images';
import { GroupDiscussionScreen } from '../../modules/chat/screens/GroupDiscussionScreen';
import { ChatScreen } from '../../modules/chat/screens/ChatScreen';

const TabLayout: React.FC = () => {
  const { animatedStyle } = useThemeInterpolation(
    Colors.white,
    Colors.primaryBlack,
    'backgroundColor',
  );

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '80px',
    height: '100vh',
    backgroundColor: '#FEFEFE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 8px',
    gap: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  };

  const logoStyle: React.CSSProperties = {
    width: '41px',
    height: '36px',
    background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const navContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '64px',
    height: '260px',
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    gap: '8px',
    width: '64px',
    height: '52px',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    background: isActive 
      ? 'linear-gradient(42.15deg, #000000 0%, #000000 11.26%, #405c57ff 22.91%, #E79C1C 77.68%)'
      : 'transparent',
  });


  const iconStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? '#FFFFFF' : '#44536F',
    fontSize: '24px',
  });

  const profileStyle: React.CSSProperties = {
    marginTop: 'auto',
    padding: '10px 12px',
    width: '64px',
    height: '60px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav style={sidebarStyle}>
        {/* Logo */}
        <svg width="50" height="50" viewBox="0 0 875 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2_663)">
          <rect width="875" height="900" fill="black"/>
          <g filter="url(#filter0_f_2_663)">
          <circle cx="815.368" cy="895.368" r="672.349" transform="rotate(-169.844 815.368 895.368)" fill="url(#paint0_linear_2_663)"/>
          </g>
          <g filter="url(#filter1_f_2_663)">
          <path d="M538 364.995C538 366.881 538 367.824 537.414 368.41C536.828 368.995 535.886 368.995 534 368.995H429.464C427.578 368.995 426.636 368.995 426.05 369.581C425.464 370.167 425.464 371.11 425.464 372.995V431.641C425.464 433.527 425.464 434.47 426.05 435.055C426.636 435.641 427.578 435.641 429.464 435.641H530.785C532.67 435.641 533.613 435.641 534.199 436.227C534.785 436.813 534.785 437.756 534.785 439.641V484.637C534.785 486.522 534.785 487.465 534.199 488.051C533.613 488.637 532.67 488.637 530.785 488.637H429.464C427.578 488.637 426.636 488.637 426.05 489.222C425.464 489.808 425.464 490.751 425.464 492.637V594.796C425.464 595.891 425.464 596.438 425.209 596.894C424.954 597.349 424.487 597.635 423.553 598.207L376.089 627.271C373.393 628.922 372.045 629.748 371.022 629.175C370 628.602 370 627.021 370 623.86V358C370 338.201 370 328.302 376.151 322.151C382.302 316 392.201 316 412 316H534C535.886 316 536.828 316 537.414 316.586C538 317.172 538 318.114 538 320V364.995Z" fill="white"/>
          </g>
          </g>
          <defs>
          <filter id="filter0_f_2_663" x="-89.4033" y="-9.40338" width="1809.54" height="1809.54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="116.154" result="effect1_foregroundBlur_2_663"/>
          </filter>
          <filter id="filter1_f_2_663" x="363.7" y="309.7" width="180.6" height="325.956" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="3.15" result="effect1_foregroundBlur_2_663"/>
          </filter>
          <linearGradient id="paint0_linear_2_663" x1="815.368" y1="223.019" x2="815.368" y2="1819.49" gradientUnits="userSpaceOnUse">
          <stop offset="0.346342" stop-color="#E79C1C"/>
          <stop offset="1" stop-color="#6BE1DF"/>
          </linearGradient>
          <clipPath id="clip0_2_663">
          <rect width="875" height="900" fill="white"/>
          </clipPath>
          </defs>
        </svg>



        {/* Navigation Icons */}
        <div style={navContainerStyle}>
          {/* Feed Tab */}
          <NavLink 
            to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.FEED}`} 
            style={({ isActive }) => navItemStyle(isActive)}
          >
            {({ isActive }) => (
              <AiOutlineHome style={iconStyle(isActive)} />
            )}
          </NavLink>

          {/* Live Tab */}
          <NavLink 
            to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.LIVE}`} 
            style={({ isActive }) => navItemStyle(isActive)}
          >
            {({ isActive }) => (
              <VscDeviceCameraVideo style={iconStyle(isActive)} />
            )}
          </NavLink>

          {/* Chat Tab */}
          <NavLink 
            to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.CHAT}`} 
            style={({ isActive }) => navItemStyle(isActive)}
          >
            {({ isActive }) => (
              <IoChatbubblesOutline style={iconStyle(isActive)} />
            )}
          </NavLink>

          {/* Module Tab */}
          {/* <NavLink 
            to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.MODULE}`} 
            style={({ isActive }) => navItemStyle(isActive)}
          >
            {({ isActive }) => (
              <SlGraduation style={iconStyle(isActive)} />
            )}
          </NavLink> */}
        </div>

        {/* Profile */}
        <NavLink 
          to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.PROFILE}`} 
          style={profileStyle}
        >
          <FiUser style={{ color: '#44536F', fontSize: '24px' }} />
        </NavLink>
      </nav>

      {/* Main Content */}
      <div style={{ marginLeft: '80px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// --- The Navigator Component ---
export function TabNavigator() {
  return (
    <Routes>
      <Route element={<TabLayout />}>
        <Route index element={<Navigate to={TabBarStackRoutes.FEED} replace />} />
        
        <Route path={TabBarStackRoutes.FEED} element={<FeedScreen />} />
        <Route path={TabBarStackRoutes.LIVE} element={<LiveScreen />} />
        <Route path={TabBarStackRoutes.CHAT} element={<DiscussionsScreen />} />
        <Route path={TabBarStackRoutes.SINGLEDISCUSSSION} element={<GroupDiscussionScreen />} />
        <Route path={TabBarStackRoutes.TEXTING} element={<ChatScreen params={{ title: 'Chat' }} />} />
        <Route path={TabBarStackRoutes.MODULE} element={<ModuleScreen />} />
        <Route path={TabBarStackRoutes.PROFILE} element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
}