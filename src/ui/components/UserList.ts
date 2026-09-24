import { User } from '../../models/User';
import { Library } from '../../services/Library';
import { el } from '../dom';
import { createList, ListView, rowButton } from './ItemList';

export function createUserList(users: Library<User>, onRemove: (id: string) => void): ListView {
  return createList<User>(
    'Список Користувачів',
    () => users.getAll(),
    (u) => [
      el('span', '', u.toString()),
      rowButton('Видалити', 'btn-outline-danger', () => onRemove(u.id)),
    ],
  );
}
