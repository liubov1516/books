import { Entity } from '../types';

export class Library<T extends Entity> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  add(item: T): void {
    if (this.findById(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    this.items.push(item);
  }

  remove(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.id !== id);
    return this.items.length < before;
  }

  findById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  search(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }
}
