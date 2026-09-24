import { Book } from '../../models/Book';
import { Library } from '../../services/Library';
import { el } from '../dom';
import { createList, ListView, rowButton } from './ItemList';

export interface BookListHandlers {
  onBorrow(book: Book): void;
  onReturn(book: Book): void;
  onRemove(book: Book): void;
}

export function createBookList(books: Library<Book>, h: BookListHandlers): ListView {
  let query = '';
  const search = el('input', 'form-control mb-3');
  search.placeholder = 'Пошук за автором або назвою';

  const list = createList<Book>(
    'Список Книг',
    () => books.search((b) => `${b.title} ${b.author}`.toLowerCase().includes(query)),
    (b) => [
      el('span', '', b.toString()),
      b.isBorrowed
        ? rowButton('Повернути', 'btn-warning', () => h.onReturn(b))
        : rowButton('Позичити', 'btn-primary', () => h.onBorrow(b)),
      rowButton('Видалити', 'btn-outline-danger', () => h.onRemove(b)),
    ],
    search,
  );
  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    list.resetPage();
    list.update();
  });
  return list;
}
