import React from 'react';
import ImageAssets from './../../../assets/images';
import { CImage } from './../../../components/CImage';
import { CText } from './../../../components/CText';
import { HeaderWithKebab } from './../../../components/Headers/HeaderWithKebab';
import { MCLinearGradient } from './../../../components/MCLinearGradient';
import { Colors } from './../../../constants/Colors';
import { OtherUser } from './../../../core/domain/entities/OtherUser';

interface OtherUserHeaderProps {
  user: OtherUser;
  
  onOpenOtherUserSheet?: (payload: { username: string; id: string }) => void;
}

export const OtherUserHeader = ({
  user,
  
  onOpenOtherUserSheet,
}: OtherUserHeaderProps) => {
  const handleKebabPress = () => {
    if (onOpenOtherUserSheet) {
      onOpenOtherUserSheet({ username: user.username, id: user.id });
    } else {
      console.log('Kebab pressed', user.username, user.id);
    }
  };

  return (
    <MCLinearGradient
      
      angle={190}
      colors={Colors.gradients.mainDarker}
      style={{
        position: 'relative',
        height: 320,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingTop: 16,
      }}
    >
      <HeaderWithKebab text="profile.profil" onKebabPress={handleKebabPress} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 24,
          height: '100%',
        }}
      >
        <div
          style={{
            marginBottom: 8,
            width: 64,
            height: 64,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <CImage
            height="100%"
            source={user?.profilePicture || ImageAssets.AVATAR_PINK}
          />
        </div>
        <CText toUppercase size="xxxl_black" color="white">
          {user.username}
        </CText>
      </div>
    </MCLinearGradient>
  );
};
