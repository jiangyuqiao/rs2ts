(window as any).process = {
  env: {}
}
if (!window.Buffer) {
  window.Buffer = {
    // @ts-ignore
    isBuffer() {
      return false;
    }
  };
};

import * as ts from '@babel/types';
import _generate from '@babel/generator';

function generate(ast: ts.BaseNode) {
  return _generate(ast).code as string;
}

export { transform } from './transform';
export {
  generate
};