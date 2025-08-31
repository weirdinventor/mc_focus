import { FC } from 'react';

// Import your sheet components
import { ChatSheet } from './../components/Sheets/ChatSheet';
import { LoginSheet } from './../components/Sheets/LoginSheet';
import { LogoutSheet } from './../components/Sheets/LogoutSheet';
import { OtherUserSheet } from './../components/Sheets/OtherUserSheet';
import { ProfileSheet } from './../components/Sheets/ProfileSheet';

export enum SheetsTypes {
  LOGIN_SHEET = 'login-sheet',
  CHAT_SHEET = 'chat-sheet',
  PROFILE_SHEET = 'profile-sheet',
  OTHER_USER_SHEET = 'other-user-sheet',
  LOGOUT_SHEET = 'logout-sheet',
}

// Define a comprehensive BaseSheetProps interface
export interface BaseSheetProps {
  onClose: () => void; // Common prop for all sheets
  open?: boolean; // Used by LoginSheet, ChatSheet, OtherUserSheet, LogoutSheet
  onOpenChange?: (open: boolean) => void; // Used by LoginSheet, ChatSheet, OtherUserSheet, LogoutSheet
  isOpen?: boolean; // Used by ProfileSheet
  onRequestClose?: () => void; // Used by ProfileSheet
  userId?: string; // Used by OtherUserSheet
  username?: string; // Used by OtherUserSheet
  onConfirmLogout?: () => void; // Used by LogoutSheet
  [key: string]: any; // Allow additional props for flexibility
}

export const sheetRegistry: Record<SheetsTypes, FC<BaseSheetProps>> = {
  [SheetsTypes.LOGIN_SHEET]: LoginSheet,
  [SheetsTypes.CHAT_SHEET]: ChatSheet,
  [SheetsTypes.PROFILE_SHEET]: ProfileSheet,
  [SheetsTypes.OTHER_USER_SHEET]: OtherUserSheet,
  [SheetsTypes.LOGOUT_SHEET]: LogoutSheet,
};

export {};