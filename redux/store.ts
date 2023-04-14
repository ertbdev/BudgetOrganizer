import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        warnAfter: 128,
      },
      immutableCheck: {warnAfter: 128},
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
