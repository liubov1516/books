import { Book } from '../models/Book';

export interface Entity {
  id: string;
}
export type FieldErrors = Record<string, string>;
export type BorrowResult = 'ok' | 'limit' | 'no-user';

export const PAGE_SIZE = 5;
export const MAX_BORROWED = 3;

export interface Actions {
  addBook(title: string, author: string, year: string): void;
  addUser(name: string, email: string): void;
  removeBook(book: Book): void;
  removeUser(id: string): void;
  borrow(bookId: string, userId: string): BorrowResult;
  giveBack(bookId: string): void;
}
