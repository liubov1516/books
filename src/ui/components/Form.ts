import { FieldErrors } from '../../types';
import { el } from '../dom';

export interface Field {
  name: string;
  placeholder: string;
}

export function createForm(
  title: string,
  fields: Field[],
  buttonText: string,
  validate: (values: Record<string, string>) => FieldErrors,
  onSubmit: (values: Record<string, string>) => void,
): HTMLElement {
  const form = el('form', 'card p-3 mb-3');
  form.noValidate = true;
  form.append(el('h4', 'mb-3', title));
  const refs = fields.map((f) => {
    const wrap = el('div', 'mb-2');
    const input = el('input', 'form-control');
    input.placeholder = f.placeholder;
    const err = el('div', 'text-danger small');
    wrap.append(input, err);
    form.append(wrap);
    return { name: f.name, input, err };
  });
  const btn = el('button', 'btn btn-success', buttonText);
  btn.type = 'submit';
  form.append(btn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values: Record<string, string> = {};
    refs.forEach((r) => (values[r.name] = r.input.value));
    const errors = validate(values);
    refs.forEach((r) => (r.err.textContent = errors[r.name] ?? ''));
    if (Object.keys(errors).length) return;
    onSubmit(values);
    refs.forEach((r) => (r.input.value = ''));
  });
  return form;
}
