import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface HeaderState {
  headerTitle?: string;
}

const initialState: HeaderState = {
  headerTitle: undefined,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderTitle: (state, { payload }: PayloadAction<string | undefined>) => {
      state.headerTitle = payload;
    },
    resetHeaderTitle: (state) => {
      state.headerTitle = undefined;
    },
  },
});

export const HeaderActions = headerSlice.actions;
