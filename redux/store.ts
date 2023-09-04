import {configureStore} from '@reduxjs/toolkit';
import budgetSlice from './budgetSlice';
import userSlice from './userSlice';
import accountsSlice from './accountsSlice';

export const store = configureStore({
  reducer: {
    budgetSlice: budgetSlice,
    userSlice: userSlice,
    accountsSlice: accountsSlice,
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
