import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../models/user';
import {RootState} from './store';
import {getUserData} from '../firebase/firestoreFunctions/user';

const initialState: Partial<User> = {
  id: '',
  email: '',
  name: '',
  creationTime: 0,
  config: {accounts: [], montlyBudget: 0},
};

export const fetchUserData = createAsyncThunk<Partial<User>, string, {state: RootState}>(
  'budgetSlice/fetchExpenses',
  async (id, thunkAPI) => {
    try {
      const result = await getUserData(id);
      return result;
    } catch (err) {
      const firebaseError = err as {code: string};
      return thunkAPI.rejectWithValue(firebaseError.code);
    }
  },
);

const userSlice = createSlice({
  name: 'budgetSlice',
  initialState,
  reducers: {
    resetUserSlice() {
      return {...initialState};
    },
    setUserData(state, action: PayloadAction<Partial<User>>) {
      state = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
      state = action.payload;
    });
  },
});

export const {resetUserSlice, setUserData} = userSlice.actions;

export default userSlice.reducer;
