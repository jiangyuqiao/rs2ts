import { BaseNode } from './common';
import { Question } from './token';
import { Comma, Paren, Path, Punctuated, BinOp, Lit, UnOp, Bracket, Eq, If, Block, Else, Label, While, Pat } from '.';

export type Expr = ExprCall | ExprTry | ExprPath | ExprBinary | ExprUnary | ExprLit | ExprParen | ExprArray | ExprAssign | ExprAssignOp | ExprIf | ExprBlock | ExprLoop | ExprWhile | ExprForLoop | ExprBreak | ExprContinue | ExprReturn;

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

export interface ExprBinary extends BaseNode {
  _type: 'ExprBinary';
  left: Expr;
  op: BinOp;
  right: Expr;
}

export interface ExprUnary extends BaseNode {
  _type: 'ExprUnary';
  op: UnOp;
  expr: Expr;
}

export interface ExprLit extends BaseNode {
  _type: 'ExprLit';
  lit: Lit;
}

export interface ExprParen extends BaseNode {
  _type: 'ExprParen';
  paren_token: Paren;
  expr: Expr;
}

export interface ExprArray extends BaseNode {
  _type: 'ExprArray';
  bracket_token: Bracket;
  elems: Punctuated<Expr | Comma>
};

export interface ExprAssign extends BaseNode {
  _type: 'ExprAssign';
  left: Expr;
  eq_token: Eq;
  right: Expr;
}

export interface ExprAssignOp extends BaseNode {
  _type: 'ExprAssignOp';
  left: Expr;
  op: BinOp;
  right: Expr;
}

export interface ExprIf extends BaseNode {
  _type: 'ExprIf';
  if_token: If;
  cond: Expr;
  then_branch: Block;
  else_branch?: [Else, Expr];
}

export interface ExprBlock extends BaseNode {
  _type: 'ExprBlock';
  label?: Label;
  block: Block;
}

export interface ExprLoop extends BaseNode {
  _type: 'ExprLoop';
  label?: Label;
  loop_token: undefined; // Token![loop]
  body: Block;
}

export interface ExprWhile extends BaseNode {
  _type: 'ExprWhile';
  label?: Label;
  while_token: While;
  cond: Expr;
  body: Block;
}

export interface ExprForLoop extends BaseNode {
  _type: 'ExprForLoop';
  label?: Label;
  for_token: undefined; // Token![for]
  pat: Pat;
  in_token: undefined; // Token![in]
  expr: Expr;
  body: Block;
}

export interface ExprBreak extends BaseNode {
  _type: 'ExprBreak';
  break_token: undefined; // Token![break];
  label?: Label;
  expr?: Expr;
}

export interface ExprContinue extends BaseNode {
  _type: 'ExprContinue';
  continue_token: undefined; // Token![continue]
  label?: Label;
}

export interface ExprReturn extends BaseNode {
  _type: 'ExprReturn';
  return_token: undefined; // Token![return]
  expr?: Expr;
}

/** TODO */
export interface ExprAsync extends BaseNode {}
/** TODO */
export interface ExprAwait extends BaseNode {}
/** TODO */
export interface ExprBox extends BaseNode {}
/** TODO */
export interface ExprCast extends BaseNode {}
/** TODO */
export interface ExprClosure extends BaseNode {}
/** TODO */
export interface ExprField extends BaseNode {}
/** TODO */
export interface ExprGroup extends BaseNode {}
/** TODO */
export interface ExprIndex extends BaseNode {}
/** TODO */
export interface ExprLet extends BaseNode {}
/** TODO */
export interface ExprMacro extends BaseNode {}
/** TODO */
export interface ExprMatch extends BaseNode {}
/** TODO */
export interface ExprMethodCall extends BaseNode {}
/** TODO */
export interface ExprRange extends BaseNode {}
/** TODO */
export interface ExprReference extends BaseNode {}
/** TODO */
export interface ExprRepeat extends BaseNode {}
/** TODO */
export interface ExprStruct extends BaseNode {}
/** TODO */
export interface ExprTry extends BaseNode {}
/** TODO */
export interface ExprTryBlock extends BaseNode {}
/** TODO */
export interface ExprTuple extends BaseNode {}
/** TODO */
export interface ExprType extends BaseNode {}
/** TODO */
export interface ExprUnsafe extends BaseNode {}

