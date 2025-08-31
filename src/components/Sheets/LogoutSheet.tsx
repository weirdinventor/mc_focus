import React from 'react';
import type { CSSProperties } from 'react';
import { MdLogout } from 'react-icons/md';
import { CText } from './../../components/CText';
import { Colors } from './../../constants/Colors';
import { BaseActionSheet } from './BaseActionSheet';

type LogoutSheetProps = {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onConfirmLogout?: () => void;
  onClose?: () => void; // Added to align with BaseSheetProps
};

export const LogoutSheet = ({
  open = false,
  onOpenChange,
  onConfirmLogout,
  onClose,
}: LogoutSheetProps) => {
  const onDisconnectPress = () => {
    onConfirmLogout?.();
    onOpenChange?.(false);
    onClose?.(); // Call onClose if provided
  };

  return (
    <BaseActionSheet open={open} onOpenChange={onOpenChange ?? (() => onClose?.())}>
      <div style={styles.container}>
        <CText mb={8} size="lg_bold" text="onboarding.logoutSheet.title" />
        <CText size="sm_medium" text="onboarding.logoutSheet.description" />
        <button onClick={onDisconnectPress} style={styles.buttonContainer}>
          <MdLogout color={Colors.deepRed} size={24} />
          <CText
            color="deepRed"
            size="lg_medium"
            text="parameters.items.main.logout"
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
  buttonContainer: {
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
    cursor: 'pointer',
    width: '100%',
  },
};