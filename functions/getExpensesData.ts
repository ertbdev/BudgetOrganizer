import {Expense} from '../models/expense';

export const getExpensesData = (expenses: Expense[], startDate: number, endDate: number) => {
  const monthExpenses: Expense[] = [];
  const totalExpenses: {[key: string]: number} = {};
  let totalMonthExpenses: number = 0;
  const monthExpensesByCategory: {[key: string]: number} = {};

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].date >= startDate && expenses[i].date <= endDate) {
      monthExpenses.push(expenses[i]);
      totalMonthExpenses += expenses[i].amount;
      if (expenses[i].category in monthExpensesByCategory) {
        monthExpensesByCategory[expenses[i].category] += expenses[i].amount;
      } else {
        monthExpensesByCategory[expenses[i].category] = expenses[i].amount;
      }
    }

    if (expenses[i].account in totalExpenses) {
      totalExpenses[expenses[i].account] += expenses[i].amount;
    } else {
      totalExpenses[expenses[i].account] = expenses[i].amount;
    }
  }

  return {monthExpenses, totalExpenses: Object.keys(totalExpenses).map(item => ({account: item, amount: totalExpenses[item]}))};
};
