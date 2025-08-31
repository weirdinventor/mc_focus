import React from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconicText } from './../../components/IconicText';
import { Colors } from './../../constants/Colors';
import { useBlockUserMutation } from './../../react-query/queries/user/userMutations';
import { BaseActionSheet } from './BaseActionSheet';

type OtherUserSheetProps = {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  userId?: string;
  username?: string;
  onClose?: () => void; // Added to align with BaseSheetProps
};

export const OtherUserSheet = ({
  open = false,
  onOpenChange,
  userId,
  username,
  onClose,
}: OtherUserSheetProps) => {
  const { mutate: blockUser } = useBlockUserMutation();
  const navigate = useNavigate();

  const onBlockUser = () => {
    if (userId) {
      blockUser(
        { otherUserId: userId },
        {
          onSuccess: () => {
            onOpenChange?.(false);
            onClose?.(); // Call onClose if provided
            navigate(-1);
          },
        },
      );
    }
  };

  return (
    <BaseActionSheet open={open} onOpenChange={onOpenChange ?? (() => onClose?.())}>
      <div style={styles.container}>
        <button style={styles.buttonStyle} onClick={onBlockUser}>
          <IconicText
            text="onboarding.otherUserSheet.blockUser"
            textOptions={{ username: username ?? '' }} // Fallback for undefined
            textColor="deepRed"
            iconName={'delete'}
          />
        </button>
      </div>
    </BaseActionSheet>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonStyle: {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    paddingTop: 14,
    paddingBottom: 14,
  },
};