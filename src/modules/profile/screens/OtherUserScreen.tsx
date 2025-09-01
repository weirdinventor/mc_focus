import React from 'react';
import { Screen } from './../../../components/Screen';
import { CButton } from './../../../components/Buttons/CButton';
import { CText } from './../../../components/CText';
import { BadgesList } from './../../../components/BadgesList';
import { OtherUserHeader } from '../components/OtherUserHeader';
import { formatDate } from './../../../utils/formatDate';
import ImageAssets from './../../../assets/images';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSearchUserByUsernameQuery } from '../../../react-query/queries/user/userQueries';
import { useGetConversationByUserIdQuery } from '../../../react-query/queries/chat/chatQueries';
import { useCreateConversationMutation } from '../../../react-query/queries/chat/chatMutations';
import { RootStackRoutes } from '../../../navigators/routes';
import { OtherUser } from '../../../core/domain/entities/OtherUser';


export const OtherUserScreen: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const state = (location.state || {}) as { user: OtherUser };

  const otherUserData = state.user;

  const { data: conversation } = useGetConversationByUserIdQuery({
    id: otherUserData.id,
  });

  const onWriteMessagePress = () => {
    navigate(RootStackRoutes.CHAT_SCREEN, {state: {
      title: otherUserData.username,
      participant: otherUserData,
      conversationId: conversation?.id,
    }});
  };

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
        />
      </div>
    </Screen>
  );
};