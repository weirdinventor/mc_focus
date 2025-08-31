import React, { memo, useCallback, useRef, useState, useEffect } from 'react';

// --- [CORRECTED] Importing your application's color theme ---
import { Colors } from '../../../constants/Colors';

// --- Custom hook imports for the web ---
import { useScreenOrientation } from '../../../hooks/useOrientationHandler';
import { useEscapeKeyHandler } from '../../../hooks/useBackHandler';

// --- Other Custom Imports (Assumed web-compatible) ---
import { useStreaming } from '../../../hooks/useStreaming';
import { VideoViewInfo } from './VideoViewInfo';

// --- SDK and Icon Library Imports ---
import { useParticipant } from '@videosdk.live/react-sdk';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

interface VideoViewProps {
  uri: string;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
}

const VideoView = ({ uri, isFullScreen, setIsFullScreen }: VideoViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [boxHeight, setBoxHeight] = useState(200);
  const [videoBuffering, setVideoBuffering] = useState(false);
  const [fullScreenIconVisible, setFullScreenIconVisible] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [videoKey, setVideoKey] = useState(0);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  const { allParticipantsCount, adminParticipantIds } = useStreaming();
  const { interfaceOrientation, lockToLandscape, lockToPortrait } = useScreenOrientation();
  const { micOn, displayName } = useParticipant(adminParticipantIds[0], {});

  useEscapeKeyHandler(() => {
    if (isFullScreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
      lockToPortrait();
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setBoxHeight(width * 0.5625); // 16:9 aspect ratio
    }
  }, []);

  const fullScreenHandler = useCallback(async () => {
    const element = containerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      await element.requestFullscreen();
      setIsFullScreen(true);
      lockToLandscape();
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
      lockToPortrait();
    }
  }, [lockToLandscape, lockToPortrait, setIsFullScreen]);

  const handleVideoError = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => setVideoKey((prev) => prev + 1), RETRY_DELAY);
    }
  }, [retryCount]);

  const handleVideoLoad = useCallback(() => {
    setRetryCount(0);
  }, []);

  const isLandscape = interfaceOrientation?.startsWith('landscape');
  const videoResizeMode = isLandscape ? 'contain' : 'cover';

  return (
    <div
      ref={containerRef}
      onClick={() => setFullScreenIconVisible(!fullScreenIconVisible)}
      style={{
        ...styles.container,
        height: isFullScreen ? '100%' : `${boxHeight}px`,
        // --- [CORRECTED] Using Colors constant for fullscreen background ---
        ...(isFullScreen && styles.fullScreenView),
      }}
    >
      <video
        key={videoKey}
        ref={videoRef}
        src={uri}
        autoPlay
        playsInline
        style={{ ...styles.video, objectFit: videoResizeMode }}
        onWaiting={() => setVideoBuffering(true)}
        onPlaying={() => setVideoBuffering(false)}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
      />
      {videoBuffering && (
        <div style={styles.indicator}>
          <span>Loading...</span>
        </div>
      )}
      {!isFullScreen && (
        <VideoViewInfo
          micOn={micOn}
          displayName={displayName}
          viewerCount={allParticipantsCount}
        />
      )}
      
      <button
        onClick={fullScreenHandler}
        style={{
          ...styles.fullScreenWrapper,
          opacity: fullScreenIconVisible ? 1 : 0,
        }}
      >
        {isFullScreen ? (
          // --- [CORRECTED] Using Colors constant for icon color ---
          <MdFullscreenExit size={32} color={Colors.white} />
        ) : (
          <MdFullscreen size={24} color={Colors.white} />
        )}
      </button>
    </div>
  );
};

export const MemoizedVideoView = memo(VideoView);

// --- [CORRECTED] Styles object now uses the imported Colors constants ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Colors.black, // Default background for the container
  },
  fullScreenView: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
    borderRadius: 0,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black, // Explicit background for the video element itself
  },
  fullScreenWrapper: {
    zIndex: 10,
    position: 'absolute',
    right: '8px',
    bottom: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: Colors.black40, // Semi-transparent background from your theme
    transition: 'opacity 0.3s ease-in-out',
  },
  indicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black60, // Semi-transparent overlay from your theme
    color: Colors.white,
    fontSize: '18px',
  },
};