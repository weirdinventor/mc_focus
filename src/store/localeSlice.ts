import i18n from 'i18next';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KEYS } from '../storage/Keys';
import { PersistenceStorage } from '../storage/index'; // This should be the web version (using localStorage)
import { Languages } from '../i18n/types';

interface LocaleState {
  selectedLocale: Languages | undefined;
}

const initialState: LocaleState = {
  selectedLocale: undefined,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, { payload }: PayloadAction<Languages>) => {
      // CORRECT WAY to change the language with i18next
      i18n.changeLanguage(payload); 

      // This part remains the same, assuming PersistenceStorage wraps localStorage for web
      PersistenceStorage.setItem(KEYS.LOCALE, payload);
      state.selectedLocale = payload;
    },
  },
});

export const LocaleActions = localeSlice.actions;