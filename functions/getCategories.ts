import {Expense} from '../models/expense';

export const getCategories = (expenses: Expense[]) => {
  const categories: {[key: string]: number} = {};
  let totalAmount = 0;
  expenses.forEach(item => {
    if (item.category in categories) {
      categories[item.category] += item.amount;
    } else {
      categories[item.category] = item.amount;
    }
    totalAmount += item.amount;
  });
  return Object.keys(categories)
    .map(item => ({
      category: item,
      amount: categories[item],
    }))
    .sort((a, b) => b.amount - a.amount);
};
