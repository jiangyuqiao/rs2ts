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

import * as n from '../../rs-node-types';
import * as t from '@babel/types';

function _c(item: n.BaseNode) {
  if (item._type === 'File') {
    return t.file(t.program((item as n.File).items.map(_c)));
  }
  if (item._type === 'ItemFn') {
    const itemFn = item as n.ItemFn;
    return t.functionDeclaration(
      _c(itemFn.sig.ident),
      [],
      t.blockStatement([])
    );
  }
  if (item._type = 'Ident') {
    return t.identifier((item as n.Ident).to_string);
  }
}

export { _c as convertItem, n as NodeType };