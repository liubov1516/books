import { PAGE_SIZE } from '../../types';
import { el } from '../dom';

export interface ListView {
  el: HTMLElement;
  update(): void;
  resetPage(): void;
}

export function rowButton(label: string, cls: string, onClick: () => void): HTMLButtonElement {
  const btn = el('button', `btn btn-sm ${cls}`, label);
  btn.type = 'button';
  btn.addEventListener('click', onClick);
  return btn;
}

export function createList<T>(
  title: string,
  getItems: () => T[],
  renderRow: (item: T) => HTMLElement[],
  header?: HTMLElement,
): ListView {
  const card = el('div', 'card p-3 mb-3');
  const body = el('div');
  card.append(el('h4', 'mb-3', title));
  if (header) card.append(header);
  card.append(body);
  let page = 1;

  const update = (): void => {
    const items = getItems();
    const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    page = Math.min(page, pages);
    body.replaceChildren();
    const ul = el('ul', 'list-group list-group-flush');
    items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).forEach((item) => {
      const li = el('li', 'list-group-item d-flex justify-content-between align-items-center');
      const [text, ...actions] = renderRow(item);
      const box = el('div', 'd-flex gap-2');
      box.append(...actions);
      li.append(text, box);
      ul.append(li);
    });
    body.append(ul);
    if (pages > 1) {
      const nav = el('div', 'd-flex gap-1 mt-3');
      for (let p = 1; p <= pages; p++) {
        nav.append(
          rowButton(String(p), p === page ? 'btn-primary' : 'btn-outline-primary', () => {
            page = p;
            update();
          }),
        );
      }
      body.append(nav);
    }
  };
  update();
  return { el: card, update, resetPage: () => (page = 1) };
}
