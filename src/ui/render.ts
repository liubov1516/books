import { Book } from '../models/Book';
import { User } from '../models/User';
import { Library } from '../services/Library';
import { NotificationService } from '../services/NotificationService';
import { Actions } from '../types';
import { Validation } from '../utils/validators';
import { createBookForm } from './components/BookForm';
import { createBookList } from './components/BookList';
import { showModal } from './components/Modal';
import { createUserForm } from './components/UserForm';
import { createUserList } from './components/UserList';
import { el } from './dom';

export interface Deps {
  books: Library<Book>;
  users: Library<User>;
  actions: Actions;
  notifier: NotificationService;
}

export function mount(root: HTMLElement, { books, users, actions, notifier }: Deps): void {
  const askUserId = (book: Book): void => {
    const input = el('input', 'form-control');
    input.placeholder = 'ID';
    const err = el('div', 'text-danger small mt-1');
    const body = el('div');
    body.append(input, err);
    showModal('Введіть ID користувача для позичення книги:', body, [
      { label: 'Скасувати', cls: 'btn-secondary', onClick: (close) => close() },
      {
        label: 'Зберегти',
        cls: 'btn-primary',
        onClick: (close) => {
          const error = Validation.userId(input.value);
          if (error) return void (err.textContent = error);
          const result = actions.borrow(book.id, input.value.trim());
          if (result === 'no-user') return void (err.textContent = 'Користувача не знайдено');
          close();
          refresh();
        },
      },
    ]);
  };

  const bookList = createBookList(books, {
    onBorrow: askUserId,
    onReturn: (b) => {
      actions.giveBack(b.id);
      refresh();
    },
    onRemove: (b) => {
      actions.removeBook(b);
      refresh();
    },
  });
  const userList = createUserList(users, (id) => {
    actions.removeUser(id);
    refresh();
  });
  const refresh = (): void => {
    bookList.update();
    userList.update();
  };

  notifier.subscribe((message) =>
    showModal(null, message, [
      { label: 'Зрозуміло!', cls: 'btn-primary', onClick: (close) => close() },
    ]),
  );

  root.className = 'container py-4';
  root.append(
    el('h2', 'text-center mb-3', 'Система Управління Бібліотекою'),
    createBookForm((t, a, y) => {
      actions.addBook(t, a, y);
      refresh();
    }),
    createUserForm((n, e) => {
      actions.addUser(n, e);
      refresh();
    }),
    bookList.el,
    userList.el,
  );
}
