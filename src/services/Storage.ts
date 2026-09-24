export class Storage {
  save<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load<T>(key: string): T[] {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
