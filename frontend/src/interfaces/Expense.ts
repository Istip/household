export interface IExpense {
  readonly _id: string;
  amount: number;
  description?: string;
  user: string;
  readonly createdAt: Date;
  readonly pdatedAt: Date;
}
