import { transformToTSCode, Options } from './transformer';
import * as storage from './storage';
import debounce from 'lodash/debounce';

const testCode =
`fn test(x: usize, y: usize) {
  if (x > y) {
    x
  } else {
    y
  }
}
`;

let submitBtn: HTMLButtonElement;
let codeInput: HTMLTextAreaElement;
let codeOutput: HTMLTextAreaElement;
let lock = false;

function startTransform() {
  if (lock) {
    return;
  }
  lock = true;
  const source = codeInput.value;
  transformToTSCode(source, { toCamelCase: true }).then((r) => {
    codeOutput.value = r;
  }).catch((e) => {
    console.error(e);
  }).finally(() => lock = false);
}

function onInputChange() {
  storage.write(codeInput.value);
}

window.onload = function () {
  submitBtn = document.querySelector('#submit');
  codeInput = document.querySelector('#source');
  codeOutput = document.querySelector('#target');
  codeInput.value = storage.read() || testCode;
  startTransform();

  submitBtn.addEventListener('click', startTransform);
  codeInput.addEventListener('input', debounce(onInputChange, 1000));
};


