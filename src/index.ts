import { transformToTSCode, Options } from './transformer';
import * as storage from './storage';
import * as display from './display';
import debounce from 'lodash/debounce';

function onInputChange() {
  const source = display.getInput();
  storage.write(source);
  transformToTSCode(source, { toCamelCase: true }).then((r) => {
    display.setOutput(r);
  }).catch((e) => {
    if (typeof e.toString === 'function') {
      display.setOutput(e.toString())
    }
    console.error(e);
  });
}

display.init().then(() => {
  display.onInputChange(debounce(onInputChange, 1500));
  onInputChange();
});
