import * as rs from './rust/node-types';
import * as ts from '@babel/types';
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import { Options } from './types';

function isUpperCase(t: string) {
  return t.toUpperCase() === t;
}

export function convertIdentifierNameString(name: string, o: Options) {
  if (o.toCamelCase) {
    return camelCase(name);
  }
  return name;
}

export function convertTypeNameString(name: string, o: Options) {
  if (o.toCamelCase) {
    let str = camelCase(name);
    if (isUpperCase(name[0])) {
      str = upperFirst(str)
    }
    return str;
  }
  return name;
}

export function convertPunctuatedToArray<T>(punctuated: rs.Punctuated<T>): T[] {
  return Array.from(punctuated);
}

export function isAnAssignedExpression(node: rs.Expr) {
  const parent = node.getParent();
  if (parent && ['ExprAssignOp', 'ExprAssign', 'Local'].includes(parent._type)) {
    return true;
  }
  return false;
}

export function wrapByIIFE(stmts: ts.Statement[]) {
  const fnExp = ts.functionExpression(undefined, [], ts.blockStatement(stmts));
  const callExp = ts.callExpression(fnExp, []);
  return callExp;
}