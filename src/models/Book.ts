import { IBook } from './interfaces/IBook';

export class Book implements IBook {
  constructor(
    private _id: string,
    private _title: string,
    private _author: string,
    private _year: number,
    private _borrowedBy: string | null = null,
  ) {}

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get author(): string {
    return this._author;
  }
  get year(): number {
    return this._year;
  }
  get borrowedBy(): string | null {
    return this._borrowedBy;
  }
  set borrowedBy(userId: string | null) {
    this._borrowedBy = userId;
  }
  get isBorrowed(): boolean {
    return this._borrowedBy !== null;
  }

  toString(): string {
    return `${this._title} by ${this._author} (${this._year})`;
  }
  toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      borrowedBy: this._borrowedBy,
    };
  }
  static from(d: IBook): Book {
    return new Book(d.id, d.title, d.author, d.year, d.borrowedBy);
  }
}
