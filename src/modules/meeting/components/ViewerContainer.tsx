import React, { JSX, useState } from 'react';
import { useParams } from 'react-router-dom';

// --- Custom Component Imports ---
import { TopHeader } from '../../../components/Headers/TopHeader';
import { FakeKeyboardView } from './FakeKeyboardView';
import { LiveMessagesContainer } from './LiveMessagesContainer';
import { MeetingToolbar } from './MeetingToolbar'; // The component from Part 1
import { MemoizedParticipantList } from './ParticipantsList';
import { MemoizedVideoView } from './VideoView';
import { GuestToolbar } from './GuestToolbar';

// --- Hooks and State Management ---
import { useStreaming } from '../../../hooks/useStreaming';
import { useAppSelector } from '../../../store/index';

// --- SDK Hook Imports ---
import { useMeeting, usePubSub } from '@videosdk.live/react-sdk';

// --- [NEW] Sheet Management Imports ---
// We import your registry and types to manage the chat sheet.
import { sheetRegistry, SheetsTypes } from '../../../../src/lib/sheets'; // Adjust path if needed

// --- Type Definition ---
export enum StreamType {
  HLS = 'HLS',
  WEBRTC = 'WEBRTC',
  LIVE = 'live',
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Log error and info for debugging
    console.error('ErrorBoundary caught an error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 32, color: 'red'}}>Something went wrong. Please reload the page.</div>;
    }
    return this.props.children;
  }
}

type HlsUrlsType = { livestreamUrl?: string };

export const ViewerContainer = (): JSX.Element => {
  const { streamType } = useParams<{ streamType: StreamType }>();
  const { headerTitle } = useAppSelector((state) => state.header);
  const { allParticipantIds, adminParticipantIds, isLiveGuest } = useStreaming() || {};
  const { hlsState, hlsUrls = {}, localParticipant, changeMode } = useMeeting() || {};
  const hlsUrlsTyped: HlsUrlsType = hlsUrls as HlsUrlsType;

  // --- [NEW] State to manage which sheet is active ---
  const [activeSheet, setActiveSheet] = useState<SheetsTypes | null>(null);

  usePubSub(`CHANGE_MODE_${localParticipant?.id ?? ''}`, {
    onMessageReceived: (data) => {
      const { message, senderName } = data;
      if (message === 'SEND_AND_RECV') { // Corrected from 'CONFERENCE'
        return showPermissionPrompt(senderName);
      }
      if (message === 'RECV_ONLY') { // Corrected from 'VIEWER'
        return changeMode('RECV_ONLY');
      }
    },
  });

  const showPermissionPrompt = (senderName: string) => {
    const accepted = window.confirm(
      `Permission\n\n${senderName} has requested you to join as a speaker.`
    );
    if (accepted) {
      changeMode('SEND_AND_RECV'); // Corrected from 'CONFERENCE'
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const streamAvailable =
    hlsState === 'HLS_PLAYABLE' &&
    streamType === StreamType.LIVE &&
    hlsUrlsTyped && !!hlsUrlsTyped.livestreamUrl;
    
  // --- [NEW] Look up the component to render from the registry ---
  const ActiveSheetComponent = activeSheet ? sheetRegistry[activeSheet] : null;

  return (
    <ErrorBoundary>
      <>
        <div style={{ ...styles.flexed, ...(isFullScreen && { backgroundColor: '#000' }) }}>
          <TopHeader
            type="static"
            text={headerTitle ? 'common.customString' : 'tabs.live'}
            textOptions={{ value: headerTitle }}
            withBackButton
          />
          <div style={styles.speakersContainer}>
            {streamAvailable && hlsUrlsTyped?.livestreamUrl && (
              <MemoizedVideoView
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
                uri={hlsUrlsTyped.livestreamUrl}
              />
            )}
            {isLiveGuest && streamType === StreamType.LIVE && <GuestToolbar />}
            {!isFullScreen && (
              <MemoizedParticipantList
                participantIds={
                  streamType === StreamType.LIVE ? adminParticipantIds : allParticipantIds
                }
                small={streamType === StreamType.LIVE}
              />
            )}
          </div>
          {!isFullScreen && (
            <div style={styles.flexed}>
              {streamType === StreamType.LIVE ? (
                <LiveMessagesContainer />
              ) : (
                // The toolbar now receives the handler function as a prop
                <MeetingToolbar onOpenChat={() => setActiveSheet(SheetsTypes.CHAT_SHEET)} />
              )}
              <FakeKeyboardView />
            </div>
          )}
        </div>

        {/* --- [NEW] Render the active sheet conditionally --- */}
        {/* This will render the ChatSheet (or any other sheet) as an overlay */}
        {ActiveSheetComponent && (
          <ActiveSheetComponent
            open={true}
            onOpenChange={(isOpen) => !isOpen && setActiveSheet(null)}
            onClose={() => setActiveSheet(null)}
          />
        )}
      </>
    </ErrorBoundary>
  );
};

// --- Converted Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  flexed: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    height: '100vh', // Ensure the container takes full viewport height
  },
  speakersContainer: {
    marginTop: '24px',
    padding: '0 24px',
  },
};