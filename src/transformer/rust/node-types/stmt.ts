import { BaseNode } from './common';
import { Expr } from './expr';
import { Pat } from './pat';
import { Brace, Let, Semi, Eq } from './token';

export type Stmt = Local | Expr;

export interface Block extends BaseNode {
  _type: 'Block';
  stmts: BaseNode[];
  brace_token: Brace;
}

export interface Local extends BaseNode {
  let_token: Let;
  pat: Pat;
  init?: [Eq, Expr];
  semi_token: Semi;
}

export interface Stmt_Semi extends BaseNode {
  _type: 'Stmt::Semi';
  0: Expr;
  1: Semi;
}
