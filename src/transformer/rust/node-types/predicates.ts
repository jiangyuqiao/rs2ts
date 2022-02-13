import { BaseNode, Ident } from './common';
import { Comma } from './token';
import { Expr, Index } from './expr';
import { Type, TypePath } from './ty';
import { Pat, PatIdent, PatType } from './pat';
import { Stmt } from './stmt';
import { ReturnType_Default, ReturnType_Type } from './item';

// type predicates

export function isComma(node: BaseNode): node is Comma {
  return node.isTypeOf('Comma');
}

export function isIdent(node: BaseNode): node is Ident {
  return node.isTypeOf('Ident');
}

export function isIndex(node: BaseNode): node is Index {
  return node.isTypeOf('Index');
}

export function isTypePath(node: BaseNode): node is TypePath {
  return node.isTypeOf('TypePath');
}

export function isPatIdent(node: BaseNode): node is PatIdent {
  return node.isTypeOf('PatIdent');
}

export function isPatType(node: BaseNode): node is PatType {
  return node.isTypeOf('PatType');
}

export function isExpr(node: BaseNode): node is Expr {
  return node.hasAbsType('Expr');
}

export function isType(node: BaseNode): node is Type {
  return node.hasAbsType('Type');
}

export function isPat(node: BaseNode): node is Pat {
  return node.hasAbsType('Pat');
}

export function isStmt(node: BaseNode): node is Stmt {
  return node.hasAbsType('Stmt');
}

export function hasExplicitReturnType(
  output: ReturnType_Default | ReturnType_Type
): output is ReturnType_Type {
  return output.isTypeOf('ReturnType::Type');
}
