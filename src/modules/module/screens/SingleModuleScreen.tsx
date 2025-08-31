import { ResourcesFeed } from '../../chat/screens/GroupDiscussionScreen';
import { CommunicationBlocks } from './../../../components/CommunicationBlocks';
import { DiscussionHeader } from './../../../components/Headers/DiscussionHeader';
import { ComingSoonFeed } from './../../../modules/live/components/ComingSoonFeed';
import { CurrentLiveFeed } from './../../../modules/live/components/CurrentLiveFeed';
import { RebroadcastFeed } from './../../../modules/live/components/RebroadcastFeed';
import { RootStackRoutes } from './../../../navigators/routes'; // Assuming these are now string paths
import { useGetResourcesByGroupIdQuery } from './../../../react-query/queries/feed/feedQueries';
import { useGetModuleByIdQuery } from './../../../react-query/queries/modules/modulesQueries';
import { useJoinVoiceRoomMutation } from './../../../react-query/queries/stream/streamMutations';
import { HeaderActions } from './../../../store/headerSlice';
import { useAppDispatch } from './../../../store/index';
import React, { JSX } from 'react';
// 1. Import web navigation hooks
import { useNavigate, useParams } from 'react-router-dom';

// 2. Component signature no longer takes navigation props
export const SingleModuleScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const { moduleId } = useParams<{ moduleId: string }>(); // Hook to get URL parameters

  const { data: moduleById } = useGetModuleByIdQuery({ id: moduleId  ?? "" });
  const { data: resources } = useGetResourcesByGroupIdQuery({
    groupId: moduleId ?? "",
  });
  const { mutate } = useJoinVoiceRoomMutation();

  const onVocalChannelPress = () => {
    if (moduleById?.voiceRoomId) {
      dispatch(HeaderActions.setHeaderTitle(moduleById?.name));
      mutate(
        { groupId: moduleId! }, // Add non-null assertion if you're sure moduleId will exist
        {
          onSuccess: ({ token }) => {
            // 3. Use navigate() from the hook
            navigate(RootStackRoutes.MEETING_SCREEN, { // Assuming this is a URL path now
              state: { // Pass data via state
                streamType: 'vocal',
                meetingId: moduleById?.voiceRoomId || '',
                token: token,
              },
            });
          },
        },
      );
    }
  };

  return (
    // 4. Replace <Screen> with a <div> and apply web styles
    <div style={styles.container}>
      {/* Assuming DiscussionHeader has been converted */}
      <DiscussionHeader
        membersCount={moduleById?.members}
        title={moduleById?.name}
       />

      {/* Assuming CommunicationBlocks has been converted */}
      <CommunicationBlocks
        onDiscussionPress={() =>
          // 5. Use navigate() for this action as well
          navigate(RootStackRoutes.CHAT_SCREEN, { // Assuming this is a URL path
            state: {
              title: moduleById?.name || '',
              conversationId: moduleById?.id || '',
              isGroup: true,
            },
          })
        }
        onVocalPress={onVocalChannelPress}
      />

      {/* These feed components are used as-is, assuming they are converted */}
      <CurrentLiveFeed groupId={moduleId ?? ""} />
      <ComingSoonFeed groupId={moduleId} />
      <RebroadcastFeed groupId={moduleId} />
      <ResourcesFeed data={resources} groupId={moduleId ?? ""} />
    </div>
  );
};

// 6. Convert StyleSheet to a CSS-in-JS object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 48,
    overflowY: 'auto', // Make the screen scrollable if content overflows
    height: '100vh', // Make the container take the full height
    boxSizing: 'border-box', // Ensure padding is included in the height
  },
};