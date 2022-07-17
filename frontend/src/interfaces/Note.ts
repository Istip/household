export interface Note {
  _id: string;
  text: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  __v?: number;
}

interface Comment {
  text: string;
  createdBy: string;
  createdAt: Date;
}
