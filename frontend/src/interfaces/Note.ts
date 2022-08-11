export interface Note {
  readonly _id: string;
  text: string;
  description?: string;
  createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  comments: Comment[];
  readonly __v?: number;
  marked: boolean;
}

export interface Comment {
  _id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
}
