import { Validation } from '../../utils/validators';
import { createForm } from './Form';

export function createBookForm(
  onSubmit: (title: string, author: string, year: string) => void,
): HTMLElement {
  return createForm(
    'Додати Книгу',
    [
      { name: 'title', placeholder: 'Назва книги' },
      { name: 'author', placeholder: 'Автор' },
      { name: 'year', placeholder: 'Рік видання' },
    ],
    'Додати Книгу',
    Validation.validateBook,
    (v) => onSubmit(v.title.trim(), v.author.trim(), v.year.trim()),
  );
}
