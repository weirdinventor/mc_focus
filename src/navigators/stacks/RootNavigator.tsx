// --- React & Library Imports ---
import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

// --- Redux & React Query Hooks ---
import { useAppSelector } from '../../store/index';
import { useGetMeQuery } from '../../react-query/queries/user/userQueries';
import { useAuth } from '../../hooks/useAuth';

// --- Route Definitions ---
import { RootStackRoutes } from '../routes';

// --- Navigator Components ---
import { OnboardingNavigator } from './OnboardingNavigator';
import { ParametersNavigator } from './ParametersNavigator';
import { TabNavigator } from './TabNavigator';

import { ChatScreen } from '../../modules/chat/screens/ChatScreen';
import { FreeUserChatScreen } from '../../modules/chat/screens/FreeUserChatScreen';
import { MessagesListScreen } from '../../modules/chat/screens/MessagesListScreen';
import { CurrentContentScreen } from '../../modules/home/screens/CurrentContentScreen';
import { RebroadcastContentScreen } from '../../modules/home/screens/RebroadcastContentScreen';
import { SearchScreen } from '../../modules/home/screens/SearchScreen';
import { SoonContentScreen } from '../../modules/home/screens/SoonContentScreen';
import { MeetingScreen } from '../../modules/meeting/screens/MeetingScreen';
import { OtherUserScreen } from '../../modules/profile/screens/OtherUserScreen';
import ImageAssets from '../../assets/images';
import { GroupDiscussionScreen } from '../../modules/chat/screens/GroupDiscussionScreen';


const FullScreenLoader = () => (
  <div
    style={{
      backgroundColor: "#A61EDF",
      display: "flex",
      background:
        "linear-gradient(42.15deg, #CA82FF 0%, #CD80F0 11.26%, #A61EDF 22.91%, #1C0024 77.68%)",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
    }}
  >
    <img src={ImageAssets.MC_LOGO} alt="App Logo" style={{ width: 120, height: "auto" }} />
  </div>
);

const ComingSoonScreen = ({ screenName }: { screenName: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', textAlign: 'center' }}>
    <h2>🚧 {screenName} - Under Development</h2>
    <p>This screen has missing dependencies and is currently being fixed.</p>
    <p>Please check back later.</p>
  </div>
);
// TODO : I kept this for later when subscription is revised
const ProtectedRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data: me, isLoading: isUserLoading } = useGetMeQuery(isLoggedIn);

  if (isUserLoading) {
    return <FullScreenLoader />;
  }

  if (!isLoggedIn) {
    return <Navigate to={RootStackRoutes.ONBOARDING_STACK} replace />;
  }

  if (!me || !me.isSubscribed) {
    return <Navigate to={RootStackRoutes.SUB_SCREEN} replace />;
  }
  return <Outlet />;
};


export function RootNavigator() {

  const { authInitialising, login } = useAuth(true);

  useEffect(() => {
    login();
  }, [authInitialising,login]);



  return (
    <Routes>

      {/* Authenticated Routes */}
      <Route element={<RequireAuth />} >
        <Route path={`${RootStackRoutes.TAB_STACK}/*`} element={<TabNavigator />} />
        <Route path={`${RootStackRoutes.PARAMETERS_STACK}/*`} element={<ParametersNavigator />} />

        {/* Working Individual Screens */}
        <Route path={RootStackRoutes.MEETING_SCREEN} element={<MeetingScreen />} />
        <Route path={RootStackRoutes.SOON_CONTENT_SCREEN} element={<SoonContentScreen />} />
        <Route path={RootStackRoutes.CURRENT_CONTENT_SCREEN} element={<CurrentContentScreen />} />
        <Route path={RootStackRoutes.REBROADCAST_CONTENT_SCREEN} element={<RebroadcastContentScreen />} />
        <Route path={RootStackRoutes.CHAT_SCREEN} element={<ChatScreen />} />
        <Route path={RootStackRoutes.MESSAGES_LIST_SCREEN} element={<MessagesListScreen />} />
        <Route path={RootStackRoutes.SEARCH_SCREEN} element={<SearchScreen />} />
        <Route path={RootStackRoutes.OTHER_USER_SCREEN} element={<OtherUserScreen />} />
        <Route path={RootStackRoutes.FREE_USER_CHAT_SCREEN} element={<FreeUserChatScreen />} />

        {/* Screens with Errors - Using Placeholder Components */}
        <Route path={RootStackRoutes.ANONCES_CONTENT_SCREEN} element={<ComingSoonScreen screenName="Anonces Content" />} />
        <Route path={RootStackRoutes.RESOURCES_CONTENT_SCREEN} element={<ComingSoonScreen screenName="Resources Content" />} />
        <Route path={RootStackRoutes.MY_MODULES_CONTENT_SCREEN} element={<ComingSoonScreen screenName="My Modules Content" />} />
        <Route path={RootStackRoutes.ALL_MODULES_CONTENT_SCREEN} element={<ComingSoonScreen screenName="All Modules Content" />} />
        <Route path={RootStackRoutes.SINGLE_MODULE_SCREEN} element={<ComingSoonScreen screenName="Single Module" />} />
        <Route path={RootStackRoutes.GROUP_DISCUSSION_SCREEN} element={<GroupDiscussionScreen />} />
        <Route path={RootStackRoutes.CHANGE_PASSWORD_SCREEN} element={<ComingSoonScreen screenName="Change Password" />} />
      </Route>

      {/* Guest routes */}
      <Route element={<RequireGuest />} >
        <Route path={`${RootStackRoutes.ONBOARDING_STACK}/*`} element={<OnboardingNavigator />} />
      </Route>
    </Routes>
  );
};

const RequireAuth = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { data: me, isLoading: isUserLoading } = useGetMeQuery(isLoggedIn);
  const { authInitialising } = useAuth(true);
  return (isUserLoading || !authInitialising ) ? <FullScreenLoader /> : isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={`${RootStackRoutes.ONBOARDING_STACK}`} state={{ from: location }} />
  );
};

const RequireGuest = () => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data: me, isLoading: isUserLoading } = useGetMeQuery(isLoggedIn);
  const { authInitialising } = useAuth(true);
  return (isUserLoading || !authInitialising ) ? <FullScreenLoader /> : isLoggedIn ?
    <Navigate to={`${RootStackRoutes.TAB_STACK}`} state={{ from: location }} />
    :
    <Outlet />;
};