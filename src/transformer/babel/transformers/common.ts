import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { register } from './registry';
import { wrapTypeAnnotation } from './type-annotation';
import {
  convertPunctuatedToArray, convertIdentifierNameString
} from '../../utils';

register('File', function (node, c) {
  return ts.file(
    ts.program(node.items.map((item) => c.t(item) as ts.Statement))
  );
});

register('Ident', function (node, c) {
  return ts.identifier(convertIdentifierNameString(node.to_string, c.options));
});

register('ItemFn', function (node, c) {
  const params = convertPunctuatedToArray(node.sig.inputs)
    .filter(n => n._type === 'PatType')
    .map(i => c.t(i as rs.PatType));
  const fnDeclaration = ts.functionDeclaration(
    c.t(node.sig.ident),
    params,
    ts.blockStatement(node.block.stmts.map(stmt => c.t(stmt) as any))
  );
  if (node.sig.output._type === 'ReturnType::Type') {
    fnDeclaration.returnType = wrapTypeAnnotation(c.t(node.sig.output[1]));
  }
  return fnDeclaration;
});
