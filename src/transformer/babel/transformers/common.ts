import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { register } from './registry';
import { wrapTypeAnnotation } from './type-annotation';
import {
  convertPunctuatedToArray, convertIdentifierNameString
} from '../../utils';

register('File', function (node: rs.File, c) {
  return ts.file(
    ts.program(node.items.map((item) => c.t(item) as ts.Statement))
  );
});

register('Ident', function (node: rs.Ident, c) {
  return ts.identifier(convertIdentifierNameString(node.to_string, c.options));
});

register('PatType', function (node: rs.PatType, c) {
  const id = ts.identifier(
    convertIdentifierNameString(node.pat.ident.to_string, c.options)
  );
  id.typeAnnotation = wrapTypeAnnotation(c.t(node.ty));
  return id;
});

register('ItemFn', function (node: rs.ItemFn, c) {
  const params = convertPunctuatedToArray(node.sig.inputs)
    .filter(n => n._type === 'PatType')
    .map(i => c.t(i as rs.PatType));
  const fnDeclaration = ts.functionDeclaration(
    c.t(node.sig.ident),
    params,
    ts.blockStatement([])
  );
  if (node.sig.output._type === 'ReturnType::Type') {
    fnDeclaration.returnType = wrapTypeAnnotation(c.t(node.sig.output[1]));
  }
  return fnDeclaration;
});
