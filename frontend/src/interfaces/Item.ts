export interface Item {
  readonly _id: string;
  name: string;
  createdBy: string;
  completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly __v?: number;
}
