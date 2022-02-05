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
    c.t(node.block)
  );
  if (node.sig.output._type === 'ReturnType::Type') {
    fnDeclaration.returnType = wrapTypeAnnotation(c.t(node.sig.output[1]));
  }
  return fnDeclaration;
});

register('Stmt::Semi', function (node, c) {
  const expr = c.t(node[0]);
  if (ts.isStatement(expr)) {
    return expr;
  }
  return ts.expressionStatement(expr as ts.Expression);
});

register('Local', function (node, c) {
  let init: ts.Expression;
  if (node.init) {
    init = c.t(node.init[1]) as ts.Expression;
  }
  const id = c.t((node.pat as rs.PatIdent).ident);
  return ts.variableDeclaration('const', [ts.variableDeclarator(id, init)])
});

register('Block', function (node, c) {
  const stmts = node.stmts.map((stmt) => {
    let statement = c.t(stmt);
    if (ts.isExpression(statement)) {
      return ts.returnStatement(statement);
    }
    return statement;
  });
  return ts.blockStatement(stmts);
});
