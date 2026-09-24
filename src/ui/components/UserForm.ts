import { Validation } from '../../utils/validators';
import { createForm } from './Form';

export function createUserForm(onSubmit: (name: string, email: string) => void): HTMLElement {
  return createForm(
    'Додати Користувача',
    [
      { name: 'name', placeholder: "Ім'я" },
      { name: 'email', placeholder: 'Email' },
    ],
    'Додати Користувача',
    Validation.validateUser,
    (v) => onSubmit(v.name.trim(), v.email.trim()),
  );
}
