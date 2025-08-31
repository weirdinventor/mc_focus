import React from 'react';
import { Screen } from './../../../components/Screen';
import { CButton } from './../../../components/Buttons/CButton';
import { CText } from './../../../components/CText';
import { BadgesList } from './../../../components/BadgesList';
import { OtherUserHeader } from '../components/OtherUserHeader';

import { formatDate } from './../../../utils/formatDate';
import ImageAssets from './../../../assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchUserByUsernameQuery } from '../../../react-query/queries/user/userQueries';
import { useGetConversationByUserIdQuery } from '../../../react-query/queries/chat/chatQueries';
import { useCreateConversationMutation } from '../../../react-query/queries/chat/chatMutations';
import { RootStackRoutes } from '../../../navigators/routes';

interface OtherUserScreenProps {
  // Pour web, tu peux utiliser react-router ou laisser vide
  route: { params: { id: string; username: string; createdAt: string; profilePicture?: string | null } };
}


// --- Main Screen Component ---
export const OtherUserScreen: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const { data: users, isLoading, isError } = useSearchUserByUsernameQuery(username!);
  const otherUserData = users?.[0];

  // --- FIX #2 ---
  // This call is now type-safe because the underlying type `GetConversationByUserIdCommand`
  // now accepts an optional `id`. The hook will only run if otherUserData.id is a valid string.
  const { data: existingConversation } = useGetConversationByUserIdQuery({
    id: otherUserData?.id,
  });

  const { mutate: createConversation, isPending: isCreatingConversation } = useCreateConversationMutation();

  const onWriteMessagePress = () => {
    if (existingConversation) {
        const chatPath = RootStackRoutes.CHAT_SCREEN.replace(':id', existingConversation.id);
        navigate(chatPath);
        return;
    }
    
    if (!otherUserData || isCreatingConversation) return;

    // --- FIX #1 ---
    // Use the correct property name as defined in your `CreateConversationCommand` type.
    // Assuming the correct property name is `participantId`.
    createConversation({ participant: otherUserData.id }, {
      onSuccess: (data) => {
        const conversationId = data.conversation.id;
        const chatPath = RootStackRoutes.CHAT_SCREEN.replace(':id', conversationId);
        navigate(chatPath);
      },
      onError: (error) => {
        console.error("Failed to start conversation:", error);
        alert("Could not start a chat session. Please try again later.");
      }
    });
  };

  if (isLoading) {
    return (
      <Screen>
        <CText text="Loading user profile..." />
      </Screen>
    );
  }

  if (isError || !otherUserData) {
    return (
      <Screen>
        <CText text="Sorry, this user could not be found." />
      </Screen>
    );
  }

  const userWithFallbackAvatar = {
    ...otherUserData,
    profilePicture: otherUserData.profilePicture ?? ImageAssets.AVATAR_PINK,
  };

  return (
    <Screen
      noHorizontalPadding
      containerStyles={{
        paddingTop: 0,
        paddingBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        <OtherUserHeader user={userWithFallbackAvatar} />
        <BadgesList type="external" userId={otherUserData.id} />
      </div>

      <div
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CText
          mb={16}
          size="sm_medium"
          text="profile.memberSince"
          textOptions={{
            date: formatDate(otherUserData.createdAt, 'dd/MM/yyyy'),
          }}
        />
        <CButton
          buttonType="colored"
          text="profile.writeMessage"
          onClick={onWriteMessagePress}
          disabled={isCreatingConversation}
        />
      </div>
    </Screen>
  );
};