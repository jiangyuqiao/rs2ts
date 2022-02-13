import { Comma, Expr, Index } from '.';
import { BaseNode, Ident } from './common';

// type predicates

export function isComma(node: BaseNode): node is Comma {
  return node._type === 'Comma';
}

export function isIdent(node: BaseNode): node is Ident {
  return node._type === 'Ident';
}

export function isIndex(node: BaseNode): node is Index {
  return node._type === 'Index';
}

export function isExpr(node: BaseNode): node is Expr {
  return node.hasAbsType('Expr');
}
