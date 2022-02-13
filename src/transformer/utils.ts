import * as rs from './rust/node-types';
import * as ts from '@babel/types';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { Options } from './types';

function isUpperCase(t: string) {
  return t.toUpperCase() === t;
}

// TODO: move to post-process
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
  if (parent && parent.isTypeAmong(['ExprAssignOp', 'ExprAssign', 'Local'])) {
    return true;
  }
  return false;
}

export function wrapByIIFE(stmts: ts.Statement[]) {
  const fnExp = ts.functionExpression(undefined, [], ts.blockStatement(stmts));
  const callExp = ts.callExpression(fnExp, []);
  return callExp;
}

export function getMutabilityFromPat(pat: rs.Pat) {
  if (rs.isPatIdent(pat)) {
    return Boolean(pat.mutability);
  } if (rs.isPatType(pat)) {
    return Boolean(pat.pat.mutability);
  }
  return true;
}