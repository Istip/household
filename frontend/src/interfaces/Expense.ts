export interface IExpense {
  _id: string;
  amount: number;
  description?: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
