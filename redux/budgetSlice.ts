import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Expense} from '../models/expense';
import {addExpense, deleteExpense, getExpenses, updateExpense} from '../firebase/firestoreFunctions/expenses';
import {Income} from '../models/income';
import {addIncome, deleteIncome, updateIncome} from '../firebase/firestoreFunctions/incomes';
import dayjs from 'dayjs';
import {getCategories} from '../functions/getCategories';
import {updateFunds} from '../firebase/firestoreFunctions/accounts';

type Balance = {
  totalIncomes: number;
  totalExpenses: number;
};

type BudgetSliceProps = {
  expenses: {[key: string]: Expense[]};
  monthlyExpenses: Expense[];
  totalMonthlyExpenses: number;
  monthlyExpensesByCategory: Pick<Expense, 'category' | 'amount'>[];
  incomes: Income[];
  monthlyIncomes: Income[];
  selectedMonth: number;
  balance: {bankAccount: Balance; cash: Balance};
};

const initialState: BudgetSliceProps = {
  expenses: {},
  monthlyExpenses: [],
  totalMonthlyExpenses: 0,
  monthlyExpensesByCategory: [],
  incomes: [],
  monthlyIncomes: [],
  balance: {bankAccount: {totalExpenses: 0, totalIncomes: 0}, cash: {totalExpenses: 0, totalIncomes: 0}},
  selectedMonth: dayjs().startOf('month').unix() * 1000,
};

export const addNewExpense = createAsyncThunk<Expense, Expense, {state: RootState}>(
  'budgetSlice/addNewExpense',
  async (expense, thunkAPI) => {
    try {
      await addExpense(expense);
      await updateFunds(expense.account, -expense.amount);
      return expense;
    } catch (err) {
      const firebaseError = err as {code: string};
      return thunkAPI.rejectWithValue(firebaseError.code);
    }
  },
);

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
    await updateFunds(income.account, income.amount);
  } catch (err) {
    const firebaseError = err as {code: string};
    return thunkAPI.rejectWithValue(firebaseError.code);
  }
});

export const fetchExpenses = createAsyncThunk<Expense[], void, {state: RootState}>('budgetSlice/fetchExpenses', async (_, thunkAPI) => {
  try {
    const month = dayjs(thunkAPI.getState().budgetSlice.selectedMonth).format('MM-YYYY');
    const expenses = thunkAPI.getState().budgetSlice.expenses;
    if (expenses && month in expenses) {
      return expenses[month];
    }
    const result = await getExpenses(month);
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
    setExpenses(state, action: PayloadAction<{expenses: Expense[]; month: string}>) {
      const expenses = {...state.expenses, [action.payload.month]: action.payload.expenses};
      state.expenses = expenses;
      console.log(expenses);

      const monthlyExpenses = expenses[dayjs(state.selectedMonth).format('MM-YYYY')] || [];
      state.monthlyExpenses = monthlyExpenses;

      state.monthlyExpensesByCategory = getCategories(monthlyExpenses);
      state.totalMonthlyExpenses = monthlyExpenses.reduce((acc, item) => acc + item.amount, 0);

      // state.balance.bankAccount.totalExpenses = action.payload.reduce(
      //   (acc, expense) => (expense.account === 'Bank Account' ? acc + expense.amount : acc),
      //   0,
      // );

      // state.balance.cash.totalExpenses = action.payload.reduce(
      //   (acc, expense) => (expense.account === 'Cash' ? acc + expense.amount : acc),
      //   0,
      // );
    },
    setIncomes(state, action: PayloadAction<Income[]>) {
      state.incomes = action.payload;
      // state.monthlyIncomes = action.payload.filter(
      //   income => income.date > state.selectedMonth.start && income.date < state.selectedMonth.end,
      // );

      // state.balance.bankAccount.totalIncomes = action.payload.reduce(
      //   (acc, income) => (income.account === 'Bank Account' ? acc + income.amount : acc),
      //   0,
      // );
      // state.balance.cash.totalIncomes = action.payload.reduce((acc, income) => (income.account === 'Cash' ? acc + income.amount : acc), 0);
    },
    changeSelectedMonth(state, action: PayloadAction<number>) {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        const month = dayjs(state.selectedMonth).format('MM-YYYY');
        const expenses = {...state.expenses, [month]: action.payload};
        state.expenses = expenses;

        const monthlyExpenses = action.payload || [];
        state.monthlyExpenses = monthlyExpenses;

        state.monthlyExpensesByCategory = getCategories(monthlyExpenses);
        state.totalMonthlyExpenses = monthlyExpenses.reduce((acc, item) => acc + item.amount, 0);
      })
      .addCase(addNewExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        const month = dayjs(action.payload.date).format('MM-YYYY');
        const tmp = state.expenses[month];
        const monthExpenses: Expense[] = [];
        let inserted = false;
        tmp.forEach(item => {
          if (action.payload.date > item.date && !inserted) {
            monthExpenses.push(action.payload);
            inserted = true;
          }
          monthExpenses.push(item);
        });
        if (!inserted) {
          monthExpenses.push(action.payload);
        }
        state.expenses[month] = monthExpenses;

        if (dayjs(state.selectedMonth).format('MM-YYYY') === month) {
          state.monthlyExpenses = monthExpenses;
          state.monthlyExpensesByCategory = getCategories(monthExpenses);
          state.totalMonthlyExpenses = monthExpenses.reduce((acc, item) => acc + item.amount, 0);
        }
      });
  },
});

export const {resetBudgetSlice, setExpenses, setIncomes, changeSelectedMonth} = budgetSlice.actions;

export default budgetSlice.reducer;
