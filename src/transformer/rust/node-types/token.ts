import { Span, BaseNode } from './common';

export const TokenTypeNames = ['Comma', 'Colon', 'Colon2', 'RArrow', 'Brace', 'Bracket', 'Semi', 'Let', 'Mut', 'If', 'While', 'Else', 'Eq', 'Question', 'Paren', 'Add', 'Sub', 'Star', 'Div', 'Rem', 'AndAnd', 'OrOr', 'Caret', 'And', 'Or', 'Shl', 'Shr', 'EqEq', 'Lt', 'Le', 'Ne', 'Ge', 'Gt', 'AddEq', 'SubEq', 'MulEq', 'DivEq', 'RemEq', 'CaretEq', 'AndEq', 'OrEq', 'ShlEq', 'ShrEq', 'Bang'] as const;
export type TokenTypeName = typeof TokenTypeNames[number];

export interface Token extends BaseNode {
  _type: TokenTypeName;
  span: Span;
}

export interface Comma extends Token {
  _type: 'Comma';
}

export interface Colon extends Token {
  _type: 'Colon';
}

export interface Colon2 extends Token {
  _type: 'Colon2';
}

export interface RArrow extends Token {
  _type: 'RArrow';
}

export interface Brace extends Token {
  _type: 'Brace';
}

export interface Bracket extends Token {
  _type: 'Bracket';
}

export interface Semi extends Token {
  _type: 'Semi';
}

export interface Let extends Token {
  _type: 'Let';
}

export interface Mut extends Token {
  _type: 'Mut';
}

export interface If extends Token {
  _type: 'If';
}

export interface While extends Token {
  _type: 'While';
}

export interface Else extends Token {
  _type: 'Else';
}

export interface Eq extends Token {
  _type: 'Eq';
}

export interface Question extends Token {
  _type: 'Question';
}

export interface Paren extends Token {
  _type: 'Paren';
}

export type BinOp = Add | Sub | Star | Div | Rem | AndAnd | OrOr | And | Or | Caret | Shl | Shr | EqEq | Lt | Le | Ne | Ge | Gt | AddEq | SubEq | MulEq | DivEq | RemEq | CaretEq | AndEq | OrEq | ShlEq | ShrEq;

export type UnOp =
  Star | // The `*` operator for dereferencing
  Bang | // The `!` operator for logical inversion
  Sub; // The `-` operator for negation

// The `+` operator (addition)
export interface Add extends Token {
  _type: 'Add';
}

// The `-` operator (subtraction)
export interface Sub extends Token {
  _type: 'Sub';
}

// The `*` operator (multiplication)
export interface Star extends Token {
  _type: 'Star';
}

// The `/` operator (division)
export interface Div extends Token {
  _type: 'Div';
}

// The `%` operator (modulus)
export interface Rem extends Token {
  _type: 'Rem';
}

// The `&&` operator (logical and)
export interface AndAnd extends Token {
  _type: 'AndAnd';
}

// The `||` operator (logical or)
export interface OrOr extends Token {
  _type: 'Or';
}

// The `^` operator (bitwise xor)
export interface Caret extends Token {
  _type: 'Caret';
}

// The `&` operator (bitwise and)
export interface And extends Token {
  _type: 'And';
}

// The `|` operator (bitwise or)
export interface Or extends Token {
  _type: 'Or';
}

// The `<<` operator (shift left)
export interface Shl extends Token {
  _type: 'Shl';
}

// The `>>` operator (shift right)
export interface Shr extends Token {
  _type: 'Shr';
}

// The `==` operator (equality)
export interface EqEq extends Token {
  _type: 'EqEq';
}

// The `<` operator (less than)
export interface Lt extends Token {
  _type: 'Lt';
}

// The `<=` operator (less than or equal to)
export interface Le extends Token {
  _type: 'Le';
}

// The `!=` operator (not equal to)
export interface Ne extends Token {
  _type: 'Ne';
}

// The `>=` operator (greater than or equal to)
export interface Ge extends Token {
  _type: 'Ge';
}

// The `>` operator (greater than)
export interface Gt extends Token {
  _type: 'Gt';
}

// The `+=` operator
export interface AddEq extends Token {
  _type: 'AddEq';
}

// The `-=` operator
export interface SubEq extends Token {
  _type: 'SubEq';
}

// The `*=` operator
export interface MulEq extends Token {
  _type: 'MulEq';
}

// The `/=` operator
export interface DivEq extends Token {
  _type: 'DivEq';
}

// The `%=` operator
export interface RemEq extends Token {
  _type: 'RemEq';
}

// The `^=` operator
export interface CaretEq extends Token {
  _type: 'CaretEq';
}

// The `&=` operator
export interface AndEq extends Token {
  _type: 'AndEq';
}

// The `|=` operator
export interface OrEq extends Token {
  _type: 'OrEq';
}

// The `<<=` operator
export interface ShlEq extends Token {
  _type: 'ShlEq';
}

// The `>>=` operator
export interface ShrEq extends Token {
  _type: 'ShrEq';
}

export interface Bang extends Token {
  _type: 'Bang';
}
