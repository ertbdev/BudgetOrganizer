import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Expense} from '../models/expense';
import {addExpense, getExpenses} from '../firebase/functions/expenses';

type BudgetSliceProps = {
  expenses: Expense[];
};

const initialState: BudgetSliceProps = {
  expenses: [],
};

export const addNewExpense = createAsyncThunk<void, Expense, {state: RootState}>('budgetSlice/addNewExpense', async (expense, thunkAPI) => {
  try {
    await addExpense(expense);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const fetchExpenses = createAsyncThunk<Expense[], void, {state: RootState}>('budgetSlice/fetchExpenses', async (_, thunkAPI) => {
  try {
    const result = await getExpenses();
    return result;
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

const budgetSlice = createSlice({
  name: 'budgetSlice',
  initialState,
  reducers: {
    resetBudgetSlice() {
      return {...initialState};
    },
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchExpenses.pending, state => {
      //   state.status = 'loading';
      // })
      .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        state.expenses = action.payload;
      });
    // .addCase(fetchExpenses.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.error.message;
    // })
  },
});

export const {resetBudgetSlice, setExpenses} = budgetSlice.actions;

export default budgetSlice.reducer;
