import { BaseNode } from './common';
import { Question } from './token';
import { Comma, Paren, Path, Punctuated } from '.';


export type Expr = ExprCall | ExprTry | ExprPath;

export interface ExprCall extends BaseNode {
  _type: 'ExprCall';
  func: Expr;
  paren_token: Paren;
  args: Punctuated<Expr | Comma>;
}

export interface ExprTry extends BaseNode {
  _type: 'ExprTry';
  expr: Expr;
  question_token: Question;
}

export interface ExprPath extends BaseNode {
  _type: 'ExprPath';
  qself: undefined;
  path: Path;
}