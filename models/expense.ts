export type Expense = {
  id?: string;
  description: string;
  amount: number;
  account: string;
  category: string;
  date: number;
  ownerId?: string;
};
