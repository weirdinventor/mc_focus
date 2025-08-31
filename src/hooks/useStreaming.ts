import { useMemo } from 'react';
// --- WEB EQUIVALENT IMPORTS ---

// 1. Import from the VideoSDK.live Web SDK instead of the React Native one.
import { Constants, useMeeting } from '@videosdk.live/react-sdk';

// 2. Import the navigation hook from React Router instead of React Navigation.
import { useNavigate } from 'react-router-dom';

/**
 * A React hook for managing streaming state with the VideoSDK.live Web SDK.
 * This is the web conversion of the original React Native hook.
 */
export const useStreaming = () => {
  // Use the web navigation hook.
  const navigate = useNavigate();
  
  // The useMeeting hook from the web SDK provides the same properties.
  // Add guard for undefined
  const meeting = useMeeting();
  if (!meeting) {
    return {
      adminParticipantIds: [],
      allParticipantIds: [],
      onLeave: () => {},
      allParticipantsCount: 0,
      viewerParticipants: [],
      isLiveGuest: false,
    };
  }
  const { participants = new Map(), leave = () => {}, localParticipant = null } = meeting;

  const adminParticipantIds = useMemo(() => {
    if (!participants || typeof participants.values !== 'function') return [];
    const attendees = [...participants.values()].filter((p) => {
      return p.mode === Constants.modes.CONFERENCE;
    });
    return attendees.map((p) => p.id).slice(0, 3);
  }, [participants]);

  const viewerParticipants = useMemo(() => {
    if (!participants || typeof participants.values !== 'function') return [];
    return [...participants.values()].filter((participant) => {
      return participant.mode === Constants.modes.VIEWER;
    });
  }, [participants]);
  
  const isLiveGuest = useMemo(() => {
    return localParticipant && adminParticipantIds.includes(localParticipant.id);
  }, [adminParticipantIds, localParticipant]);

  const allParticipantIds: string[] = useMemo(() => {
    if (!participants || typeof participants.keys !== 'function') return [];
    return [...participants.keys()];
  }, [participants]);

  const allParticipantsCount = participants && typeof participants.keys === 'function' ? [...participants.keys()].length : 0;

  const onLeave = () => {
    leave();
    navigate(-1);
  };

  return {
    adminParticipantIds,
    allParticipantIds,
    onLeave,
    allParticipantsCount,
    viewerParticipants,
    isLiveGuest,
  };
};