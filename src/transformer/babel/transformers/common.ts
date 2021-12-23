import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { register } from './registry';

register('File', function (node: rs.File, c) {
  return ts.file(
    ts.program(node.items.map((item) => c.t(item) as ts.Statement))
  );
});


register('ItemFn', function (node: rs.ItemFn, c) {
  return ts.functionDeclaration(
    c.t(node.sig.ident),
    [],
    ts.blockStatement([])
  );
});

register('Ident', function (node: rs.Ident, c) {
  return ts.identifier(node.to_string);
});