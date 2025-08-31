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

const tabIconContainerStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '8px',
  padding: '10px 16px',
  textDecoration: 'none',
  color: isActive ? Colors.iconActive : Colors.iconInactive,
  fontFamily: 'CabinetGrotesk-Bold, sans-serif',
  fontSize: '14px',
  width: '100%',
});

const TabLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { animatedStyle } = useThemeInterpolation(
    Colors.white,
    Colors.primaryBlack, // Assuming this is the desired dark color
    'backgroundColor',
  );

  const sidebarStyle: React.CSSProperties = {
    width: isExpanded ? '200px' : '60px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    borderRight: '1px solid #ddd',
    paddingTop: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav style={sidebarStyle}>
        <img
          src={ImageAssets.MC_LOGO_DARK}
          alt="Logo"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginBottom: '20px',
            width: isExpanded ? '120px' : '40px',
            cursor: 'pointer',
          }}
        />

        {/* Feed Tab */}
        <NavLink to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.FEED}`} style={({ isActive }) => navLinkStyle(isActive)}>
          <div style={{ ...tabIconContainerStyle, ...animatedStyle }}>
            <AiOutlineHome size={24} />
          </div>
          {isExpanded && <span>{TabBarStackRoutes.FEED}</span>}
        </NavLink>

        {/* Live Tab */}
        <NavLink to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.LIVE}`} style={({ isActive }) => navLinkStyle(isActive)}>
          <div style={{ ...tabIconContainerStyle, ...animatedStyle }}>
            <VscDeviceCameraVideo size={24} />
          </div>
          {isExpanded && <span>{TabBarStackRoutes.LIVE}</span>}
        </NavLink>

        {/* Chat Tab */}
        <NavLink to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.CHAT}`} style={({ isActive }) => navLinkStyle(isActive)}>
          <div style={{ ...tabIconContainerStyle, ...animatedStyle }}>
            <IoChatbubblesOutline size={24} />
          </div>
          {isExpanded && <span>{TabBarStackRoutes.CHAT}</span>}
        </NavLink>

        {/* Module Tab */}
        <NavLink to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.MODULE}`} style={({ isActive }) => navLinkStyle(isActive)}>
          <div style={{ ...tabIconContainerStyle, ...animatedStyle }}>
            <SlGraduation size={24} />
          </div>
          {isExpanded && <span>{TabBarStackRoutes.MODULE}</span>}
        </NavLink>

        {/* Profile Tab */}
        <NavLink to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.PROFILE}`} style={({ isActive }) => navLinkStyle(isActive)}>
          <div style={{ ...tabIconContainerStyle, ...animatedStyle }}>
            <FiUser size={24} />
          </div>
          {isExpanded && <span>{TabBarStackRoutes.PROFILE}</span>}
        </NavLink>
      </nav>
      <div style={{ marginLeft: isExpanded ? '200px' : '60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
        <Route path={TabBarStackRoutes.MODULE} element={<ModuleScreen />} />
        <Route path={TabBarStackRoutes.PROFILE} element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
}