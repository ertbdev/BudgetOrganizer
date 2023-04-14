
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import { User } from '../models/user';
import auth from '@react-native-firebase/auth';

type AuthSliceProps = {
  loggedUser?: User | null;
  users: User[];
  status?: 'idle' | 'loading' | 'failed' | 'succeeded';
  authError?: string | null;
};

const initialState: AuthSliceProps = {
  users: [],
};

export const signIn = createAsyncThunk<void, {email: string; password: string}, {state: RootState}>(
  'usersSlice/signIn',
  async ({email, password}, thunkAPI) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      return thunkAPI.rejectWithValue(firebaseError.code);
    }
  },
);

// export const fetchUsers = createAsyncThunk<User[], void, {state: RootState}>('usersSlice/fetchUsers', async (_, thunkAPI) => {
//   try {
//     const result = await getUsers();
//     return result;
//   } catch (err) {
//     console.log(err);
//     return thunkAPI.rejectWithValue(err);
//   }
// });

// export const editUserData = createAsyncThunk<User | undefined, User, {state: RootState}>(
//   'usersSlice/editUserData',
//   async (user, thunkAPI) => {
//     try {
//       const result = await updateUserData(user);
//       return result;
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   },
// );

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    resetUsersSlice() {
      return {...initialState};
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchUsers.pending, state => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      //   state.users = action.payload;
      //   state.status = 'succeeded';
      // })
      // .addCase(fetchUsers.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      // .addCase(editUserData.fulfilled, (state, action: PayloadAction<User | undefined>) => {
      //   if (action.payload) {
      //     const index = state.users?.findIndex(user => user.id === action.payload?.id);
      //     state.users[index] = action.payload;
      //   }

      //   state.status = 'succeeded';
      // });
  },
});

export const {resetUsersSlice} = usersSlice.actions;

export default usersSlice.reducer;
