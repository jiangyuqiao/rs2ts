import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import set from 'lodash/set';
import { register } from './registry';
import {
  convertPunctuatedToArray,
  getMutabilityFromPat,
  isAnAssignedExpression,
  wrapByIIFE
} from '../../utils';
import { Token } from '../../rust/node-types';

register('ExprCall', function (node, c) {
  const callee = c.t(node.func);
  const params = convertPunctuatedToArray(node.args)
    .filter(n => n.hasAbsType('Expr'))
    .map(n => c.t(n) as ts.Expression);
  const callExp = ts.callExpression(callee as ts.Expression, params);
  return callExp;
});

register('ExprMethodCall', function (node, c) {
  const memberExp = ts.memberExpression(
    c.t(node.receiver) as ts.Expression, c.t(node.method)
  );
  const params = convertPunctuatedToArray(node.args)
    .filter(n => n.hasAbsType('Expr'))
    .map(n => c.t(n) as ts.Expression);
  return ts.callExpression(memberExp, params);
});

register('ExprTry', function (node, c) {
  return c.t(node.expr) as ts.Expression;
});

register('ExprParen', function (node, c) {
  const exp = c.t(node.expr) as ts.Expression;
  set(exp, 'extra.parenthesized', true);
  return exp;
});

const OperatorMap = {
  Add: '+',
  Sub: '-',
  Star: '*',
  Div: '/',
  Rem: '%',
  AndAnd: '&&',
  OrOr: '||',
  Caret: '^',
  And: '&',
  Or: '|',
  Shl: '<<',
  Shr: '>>',
  EqEq: '===',
  Lt: '<',
  Le: '<=',
  Ne: '!==',
  Ge: '>=',
  Gt: '>',
  AddEq: '+=',
  SubEq: '-=',
  StarEq: '*=',
  DivEq: '/=',
  RemEq: '%=',
  CaretEq: '^=',
  AndEq: '&=',
  OrEq: '|=',
  ShlEq: '<<=',
  ShrEq: '>>=',
  Bang: '!',
};

function getOperator(token: Token) {
  const operator = OperatorMap[token._type];
  if (!operator) {
    throw new Error(`unrecognized binary operator: ${token._type}`);
  }
  return operator;
}

register('ExprBinary', function (node, c) {
  const operator = getOperator(node.op);
  return ts.binaryExpression(
    operator as any,
    c.t(node.left) as ts.Expression,
    c.t(node.right) as ts.Expression
  );
});

register('ExprUnary', function (node, c) {
  if (node.op._type === 'Star') {
    return c.t(node);
  }
  const operator = OperatorMap[node.op._type];
  return ts.unaryExpression(operator as '-' | '!', c.t(node.expr) as ts.Expression);
});

register('ExprArray', function (node, c) {
  const elements = convertPunctuatedToArray(node.elems).filter(e => e._type !== 'Comma') as rs.Expr[];
  return ts.arrayExpression(elements.map(e => c.t(e)) as ts.Expression[]);
});

register('ExprAssign', function (node, c) {
  return ts.assignmentExpression(
    '=',
    c.t(node.left) as ts.LVal,
    c.t(node.right) as ts.Expression
  );
});

register('ExprAssignOp', function (node, c) {
  return ts.assignmentExpression(
    getOperator(node.op),
    c.t(node.left) as ts.LVal,
    c.t(node.right) as ts.Expression
  );
});

register('ExprIf', function (node, c) {
  const ifStmt = ts.ifStatement(
    c.t(node.cond) as ts.Expression,
    c.t(node.then_branch)
  );
  if (node.else_branch) {
    ifStmt.alternate = c.t(node.else_branch[1]) as unknown as ts.IfStatement | ts.BlockStatement;
  }

  if (isAnAssignedExpression(node)) {
    return wrapByIIFE([ifStmt]);
  }
  return ifStmt;
});

register('ExprWhile', function (node, c) {
  return ts.whileStatement(
    c.t(node.cond) as ts.Expression,
    c.t(node.body)
  );
});

register('ExprLoop', function (node, c) {
  const whileStmt = ts.whileStatement(ts.booleanLiteral(true), c.t(node.body));
  if (isAnAssignedExpression(node)) {
    return wrapByIIFE([whileStmt]);
  }
  return whileStmt;
});

register('ExprForLoop', function (node, c) {
  const mutable = getMutabilityFromPat(node.pat);
  const stmt = ts.forOfStatement(
    // TODO: pattern transformation
    ts.variableDeclaration(mutable ? 'let' : 'const', [ts.variableDeclarator(c.t(node.pat))]),
    c.t(node.expr) as ts.Expression,
    c.t(node.body)
  );
  return stmt;
});

register('ExprBlock', function (node, c) {
  return c.t(node.block);
});

// TODO: label
register('ExprBreak', function (node, c) {
  if (node.expr) {
    return ts.returnStatement(c.t(node.expr) as ts.Expression);
  }
  return ts.breakStatement();
});

register('ExprContinue', function (node, c) {
  return ts.continueStatement();
});

register('ExprReturn', function (node, c) {
  const stmt = ts.returnStatement();
  if (node.expr) {
    stmt.argument = c.t(node.expr) as ts.Expression;
  }
  return stmt;
});

register('ExprClosure', function (node, c) {
  const params = convertPunctuatedToArray(node.inputs)
    .filter(n => n._type !== 'Comma')
    .map(n => c.t(n as rs.Pat));
  return ts.arrowFunctionExpression(
    params,
    c.t(node.body) as ts.Expression
  );
});

register('ExprLit', function (node, c) {
  return c.t(node.lit) as ts.Literal;
});

register('LitInt', function (node) {
  return ts.numericLiteral(Number(node.digits));
});

register('LitFloat', function (node) {
  return ts.numericLiteral(Number(node.digits));
});

register('LitStr', function (node) {
  return ts.stringLiteral(node.value);
});

register('LitChar', function (node) {
  return ts.stringLiteral(node.value);
});

register('LitBool', function (node) {
  return ts.booleanLiteral(node.value);
});
