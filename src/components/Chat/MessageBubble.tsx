import React from 'react';
import ImageAssets from './../../assets/images';
import { CImage } from './../../components/CImage';
import { CText, TextColors } from './../../components/CText';

interface MessageBubbleProps {
  username: string;
  onIconPress?: () => void;
  profilePicture?: string | null;
  text?: string;
  textColor?: TextColors;
}

export const MessageBubble = ({
  username,
  onIconPress,
  profilePicture,
  text,
  textColor = 'grey5',
}: MessageBubbleProps) => {
  return (
    <div style={styles.container}>
      <button style={styles.pressable} onClick={onIconPress}>
        <CImage
          style={styles.iconWrapper}
          source={profilePicture || ImageAssets.AVATAR_PINK}
          height={32}
          width={32}
        />
      </button>
      <div style={styles.textsWrapper}>
        <div style={styles.nameWrapper}>
          <CText
            size="md_bold"
            text="common.customString"
            textOptions={{ value: username }}
          />
        </div>
        {text && (
          <CText
            mt={2}
            color={textColor}
            size="sm_medium"
            text="common.customString"
            textOptions={{ value: text }}
          />
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  },
  pressable: {
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
  },
  textsWrapper: {
    flex: '1',
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    borderRadius: '4px',
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};