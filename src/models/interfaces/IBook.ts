export interface IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  borrowedBy: string | null;
}
