let last = 0;

export function generateId(): string {
  const now = Date.now();
  last = now > last ? now : last + 1;
  return String(last);
}
