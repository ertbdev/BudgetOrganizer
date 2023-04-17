import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Expense} from '../models/expense';
import {addExpense, deleteExpense, getExpenses, updateExpense} from '../firebase/functions/expenses';
import {Income} from '../models/income';
import {addIncome, deleteIncome, updateIncome} from '../firebase/functions/incomes';
import dayjs from 'dayjs';

type Balance = {
  totalIncomes: number;
  totalExpenses: number;
};

type BudgetSliceProps = {
  expenses: Expense[];
  monthlyExpenses: Expense[];
  incomes: Income[];
  monthlyIncomes: Income[];
  selectedMonth: {start: number; end: number};
  balance: {bankAccount: Balance; cash: Balance};
};

const initialState: BudgetSliceProps = {
  expenses: [],
  monthlyExpenses: [],
  incomes: [],
  monthlyIncomes: [],
  balance: {bankAccount: {totalExpenses: 0, totalIncomes: 0}, cash: {totalExpenses: 0, totalIncomes: 0}},
  selectedMonth: {start: dayjs().startOf('month').unix() * 1000, end: dayjs().endOf('month').unix() * 1000},
};

export const addNewExpense = createAsyncThunk<void, Expense, {state: RootState}>('budgetSlice/addNewExpense', async (expense, thunkAPI) => {
  try {
    await addExpense(expense);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const editExpense = createAsyncThunk<void, Expense, {state: RootState}>('budgetSlice/editExpense', async (expense, thunkAPI) => {
  try {
    await updateExpense(expense);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const removeExpense = createAsyncThunk<void, string, {state: RootState}>('budgetSlice/removeExpense', async (id, thunkAPI) => {
  try {
    await deleteExpense(id);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const editIncome = createAsyncThunk<void, Income, {state: RootState}>('budgetSlice/editIncome', async (income, thunkAPI) => {
  try {
    await updateIncome(income);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const removeIncome = createAsyncThunk<void, string, {state: RootState}>('budgetSlice/removeIncome', async (id, thunkAPI) => {
  try {
    await deleteIncome(id);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const addNewIncome = createAsyncThunk<void, Income, {state: RootState}>('budgetSlice/addNewIncome', async (income, thunkAPI) => {
  try {
    await addIncome(income);
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
      state.monthlyExpenses = action.payload.filter(
        expense => expense.date > state.selectedMonth.start && expense.date < state.selectedMonth.end,
      );

      state.balance.bankAccount.totalExpenses = action.payload.reduce(
        (acc, expense) => (expense.account === 'Bank Account' ? acc + expense.amount : acc),
        0,
      );
      state.balance.cash.totalExpenses = action.payload.reduce(
        (acc, expense) => (expense.account === 'Cash' ? acc + expense.amount : acc),
        0,
      );
    },
    setIncomes(state, action: PayloadAction<Income[]>) {
      state.incomes = action.payload;
      state.monthlyIncomes = action.payload.filter(
        income => income.date > state.selectedMonth.start && income.date < state.selectedMonth.end,
      );

      state.balance.bankAccount.totalIncomes = action.payload.reduce(
        (acc, income) => (income.account === 'Bank Account' ? acc + income.amount : acc),
        0,
      );
      state.balance.cash.totalIncomes = action.payload.reduce((acc, income) => (income.account === 'Cash' ? acc + income.amount : acc), 0);
    },
    changeSelectedMonth(state, action: PayloadAction<'add' | 'subtract'>) {
      const newMonth =
        action.payload === 'add' ? dayjs(state.selectedMonth.start).add(1, 'month') : dayjs(state.selectedMonth.start).subtract(1, 'month');

      const start = newMonth.unix() * 1000;
      const end = newMonth.endOf('month').unix() * 1000;

      state.selectedMonth.start = start;
      state.selectedMonth.end = end;

      state.monthlyExpenses = state.expenses.filter(expense => expense.date > start && expense.date < end);
      state.monthlyIncomes = state.incomes.filter(income => income.date > start && income.date < end);
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

export const {resetBudgetSlice, setExpenses, setIncomes, changeSelectedMonth} = budgetSlice.actions;

export default budgetSlice.reducer;
