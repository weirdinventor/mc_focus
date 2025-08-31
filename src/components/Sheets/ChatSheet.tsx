import React from 'react';
import type { CSSProperties } from 'react';
import { BaseActionSheet } from './BaseActionSheet';
import { CText } from './../../components/CText';

type ChatSheetProps = {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void; // Added to align with BaseSheetProps
};

export const ChatSheet = ({ open = false, onOpenChange, onClose }: ChatSheetProps) => {
  return (
    <BaseActionSheet open={open} onOpenChange={onOpenChange ?? (() => onClose?.())}>
      <div style={styles.container}>
        <CText text="Chat Sheet Content" size="lg_bold" />
      </div>
    </BaseActionSheet>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
};