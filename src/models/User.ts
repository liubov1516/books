import { IUser } from './interfaces/IUser';

export class User implements IUser {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }

  toString(): string {
    return `${this._id} ${this._name} (${this._email})`;
  }
  toJSON(): IUser {
    return { id: this._id, name: this._name, email: this._email };
  }
  static from(d: IUser): User {
    return new User(d.id, d.name, d.email);
  }
}
