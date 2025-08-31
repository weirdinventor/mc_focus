import { SheetDefinition } from 'react-native-actions-sheet';
import { SheetsTypes } from 'src/lib/sheets';

declare module 'react-native-actions-sheet' {
  interface Sheets {
    [SheetsTypes.LOGIN_SHEET]: SheetDefinition<{
      payload: { text: string };
    }>;
    [SheetsTypes.CHAT_SHEET]: SheetDefinition<>;
    [SheetsTypes.PROFILE_SHEET]: SheetDefinition<>;
    [SheetsTypes.OTHER_USER_SHEET]: SheetDefinition<{
      payload: { username: string; id: string };
    }>;
    [SheetsTypes.LOGOUT_SHEET]: SheetDefinition<{
      returnValue: { shouldDisconnect: boolean };
    }>;
  }
}
