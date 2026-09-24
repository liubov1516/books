import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import { Book } from './models/Book';
import { IBook } from './models/interfaces/IBook';
import { IUser } from './models/interfaces/IUser';
import { User } from './models/User';
import { Library } from './services/Library';
import { NotificationService } from './services/NotificationService';
import { Storage } from './services/Storage';
import { Actions, MAX_BORROWED } from './types';
import { mount } from './ui/render';
import { generateId } from './utils/idGenerator';

const storage = new Storage();
const notifier = new NotificationService();
const books = new Library<Book>(storage.load<IBook>('books').map(Book.from));
const users = new Library<User>(storage.load<IUser>('users').map(User.from));

const save = (): void => {
  storage.save('books', books.getAll());
  storage.save('users', users.getAll());
};

const actions: Actions = {
  addBook(title, author, year) {
    books.add(new Book(generateId(), title, author, Number(year)));
    save();
  },
  addUser(name, email) {
    users.add(new User(generateId(), name, email));
    save();
  },
  removeBook(book) {
    books.remove(book.id);
    save();
  },
  removeUser(id) {
    users.remove(id);
    books.search((b) => b.borrowedBy === id).forEach((b) => (b.borrowedBy = null));
    save();
  },
  borrow(bookId, userId) {
    const book = books.findById(bookId);
    const user = users.findById(userId);
    if (!book || !user) return 'no-user';
    if (books.search((b) => b.borrowedBy === userId).length >= MAX_BORROWED) {
      notifier.notify(`${user.name} вже позичив(ла) ${MAX_BORROWED} книги — це максимум.`);
      return 'limit';
    }
    book.borrowedBy = userId;
    save();
    notifier.notify(`${book} has been borrowed by ${user}.`);
    return 'ok';
  },
  giveBack(bookId) {
    const book = books.findById(bookId);
    if (!book) return;
    book.borrowedBy = null;
    save();
    notifier.notify(`${book} has been returned.`);
  },
};

const root = document.getElementById('app');
if (root) mount(root, { books, users, actions, notifier });
