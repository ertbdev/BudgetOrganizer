import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {getUserData} from '../firebase/firestoreFunctions/user';
import {Account} from '../models/account';
import {getAccounts, updateFunds} from '../firebase/firestoreFunctions/accounts';

const initialState: {accounts: Account[]} = {
  accounts: [],
};

export const fetchAccounts = createAsyncThunk<Account[], void, {state: RootState}>('accountsSlice/fetchAccounts', async (_, thunkAPI) => {
  try {
    const result = await getAccounts();
    return result;
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState,
  reducers: {
    resetAccountsSlice() {
      return {...initialState};
    },
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    });
  },
});

export const {resetAccountsSlice, setAccounts} = accountsSlice.actions;

export default accountsSlice.reducer;
