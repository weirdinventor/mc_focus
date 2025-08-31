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
    background: 'linear-gradient(42.15deg, #CA82FF 0%, #CD80F0 11.26%, #A61EDF 22.91%, #1C0024 77.68%)',
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
      ? 'linear-gradient(42.15deg, #CA82FF 0%, #CD80F0 11.26%, #A61EDF 22.91%, #1C0024 77.68%)'
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
        <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.2637 0.00195312C21.9607 0.00934696 22.6503 0.0475524 23.3291 0.115234C23.9955 0.181209 24.6518 0.275355 25.2969 0.396484C33.6586 1.96174 40.1322 8.00418 41.3086 15.5293C41.4349 16.3369 41.5 17.1617 41.5 18C41.5 18.8014 41.4402 19.5907 41.3242 20.3643C40.1931 27.9387 33.6979 34.0309 25.2969 35.6035C23.9942 35.8481 22.6453 35.9833 21.2637 35.998C21.1763 35.9992 21.088 36 21 36C20.9004 36 20.8008 36.0003 20.7012 35.998C19.3195 35.981 17.9706 35.8439 16.668 35.5977V15.2754L14.3721 20.5029L10.8994 12.3379C9.7084 13.9724 9.01858 15.9157 9.01855 18C9.01855 21.0343 10.481 23.7689 12.8213 25.6885V30.042C8.15749 27.5952 5.03418 23.1177 5.03418 18C5.03421 14.3322 6.63907 10.9927 9.26562 8.49414C10.2645 7.54432 11.4114 6.71564 12.6738 6.03711L14.1006 9.39746H14.1016L14.3916 10.0801L14.8604 8.96387L16.668 4.66016L16.7412 4.48633C18.005 4.17977 19.3325 4.00599 20.7012 3.98438V32.4609C20.8008 32.4626 20.9004 32.4629 21 32.4629C21.088 32.4629 21.1763 32.4621 21.2637 32.4609C22.657 32.4416 24.0085 32.2707 25.2969 31.9658C31.4652 30.5064 36.2015 25.9799 37.2529 20.3643C37.3967 19.5947 37.4717 18.8048 37.4717 18C37.4717 17.1952 37.3898 16.3323 37.2324 15.5293C36.1416 9.96295 31.4264 5.48453 25.2969 4.03418C24.1795 3.76971 23.0151 3.60588 21.8174 3.55469C21.6335 3.54673 21.4488 3.5419 21.2637 3.53906C21.1763 3.53793 21.088 3.53711 21 3.53711C20.9004 3.53711 20.8008 3.53736 20.7012 3.53906C19.4109 3.55954 18.1566 3.70984 16.9551 3.97656C16.8592 3.99761 16.7632 4.02022 16.668 4.04297C15.1827 4.3973 13.7802 4.92982 12.4932 5.6123C11.2307 6.2823 10.0788 7.09751 9.06836 8.03027C6.25478 10.6249 4.52835 14.1355 4.52832 18C4.52832 23.3736 7.86665 28.0632 12.8213 30.5566V34.5098C5.56973 31.7365 0.5 25.3881 0.5 18C0.500037 12.5838 3.22474 7.72568 7.53613 4.42578C8.61846 3.59775 9.80111 2.86787 11.0654 2.25195C12.7948 1.40856 14.6775 0.778271 16.668 0.402344C17.2924 0.284044 17.9287 0.191544 18.5732 0.125C19.2721 0.0522114 19.9822 0.0104837 20.7012 0.00195312C20.8008 0.000251243 20.9004 7.3652e-07 21 0C21.088 0 21.1763 0.000816943 21.2637 0.00195312ZM21.625 3.99219C22.892 4.03484 24.1225 4.20733 25.2969 4.49512C31.146 5.92667 35.6415 10.2086 36.7188 15.5293H32.6494C31.7237 12.1492 28.9385 9.40428 25.2969 8.17578V27.8242C28.9766 26.5827 31.7821 23.7937 32.6787 20.3643H36.7393C35.7014 25.7342 31.1847 30.0642 25.2969 31.5049C24.0111 31.82 22.6589 31.9973 21.2637 32.0166V3.9834C21.384 3.98453 21.5047 3.98765 21.625 3.99219Z" fill="url(#paint0_linear_3_1505)"/>
        <defs>
        <linearGradient id="paint0_linear_3_1505" x1="0.5" y1="36" x2="26.4466" y2="3.34816" gradientUnits="userSpaceOnUse">
        <stop stop-color="#CA82FF"/>
        <stop offset="0.145" stop-color="#CD80F0"/>
        <stop offset="0.295" stop-color="#A61EDF"/>
        <stop offset="1" stop-color="#1C0024"/>
        </linearGradient>
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
          <NavLink 
            to={`${RootStackRoutes.TAB_STACK}/${TabBarStackRoutes.MODULE}`} 
            style={({ isActive }) => navItemStyle(isActive)}
          >
            {({ isActive }) => (
              <SlGraduation style={iconStyle(isActive)} />
            )}
          </NavLink>
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