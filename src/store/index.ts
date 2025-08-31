/* eslint-disable no-restricted-imports */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { localeSlice } from './localeSlice';
import { authSlice } from './authSlice';
import { onboardingSlice } from './onboardingSlice';
import { headerSlice } from './headerSlice';

const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [onboardingSlice.name]: onboardingSlice.reducer,
  [headerSlice.name]: headerSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { store };
