import { FieldErrors } from '../types';

export namespace Validation {
  export const REQUIRED = "Це поле є обов'язковим";
  const YEAR_REGEX = /^(1\d{3}|20\d{2})$/;

  export function required(value: string): string | null {
    return value.trim() ? null : REQUIRED;
  }

  export function userId(value: string): string | null {
    return required(value) ?? (/^\d+$/.test(value.trim()) ? null : 'ID має містити лише цифри');
  }

  export function year(value: string): string | null {
    const req = required(value);
    if (req) return req;
    const v = value.trim();
    if (!/^\d+$/.test(v)) return 'Рік має містити лише цифри';
    if (!YEAR_REGEX.test(v) || Number(v) > new Date().getFullYear()) return 'Введіть коректний рік';
    return null;
  }

  const collect = (checks: Record<string, string | null>): FieldErrors => {
    const errors: FieldErrors = {};
    for (const [field, err] of Object.entries(checks)) {
      if (err) errors[field] = err;
    }
    return errors;
  };

  export function validateBook(v: Record<string, string>): FieldErrors {
    return collect({
      title: required(v.title ?? ''),
      author: required(v.author ?? ''),
      year: year(v.year ?? ''),
    });
  }

  export function validateUser(v: Record<string, string>): FieldErrors {
    return collect({ name: required(v.name ?? ''), email: required(v.email ?? '') });
  }
}
