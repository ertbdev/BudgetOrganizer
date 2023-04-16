import {configureStore} from '@reduxjs/toolkit';
import budgetSlice from './budgetSlice';

export const store = configureStore({
  reducer: {
    budgetSlice: budgetSlice,
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
