import { el } from '../dom';

export interface ModalButton {
  label: string;
  cls: string;
  onClick: (close: () => void) => void;
}

export function showModal(
  title: string | null,
  body: HTMLElement | string,
  buttons: ModalButton[],
): void {
  const overlay = el('div', 'modal d-block');
  overlay.style.background = 'rgba(0,0,0,.5)';
  const content = el('div', 'modal-content');
  const close = (): void => overlay.remove();

  if (title) {
    const header = el('div', 'modal-header');
    header.append(el('h5', 'modal-title', title));
    content.append(header);
  }
  const bodyEl = el('div', 'modal-body');
  bodyEl.append(body);
  const footer = el('div', 'modal-footer');
  buttons.forEach((b) => {
    const btn = el('button', `btn ${b.cls}`, b.label);
    btn.type = 'button';
    btn.addEventListener('click', () => b.onClick(close));
    footer.append(btn);
  });
  content.append(bodyEl, footer);
  const dialog = el('div', 'modal-dialog modal-dialog-centered');
  dialog.append(content);
  overlay.append(dialog);
  document.body.append(overlay);
}
