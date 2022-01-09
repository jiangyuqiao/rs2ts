import { Span } from './common';

export interface Token {
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

export interface Gt extends Token {
  _type: 'Gt';
}

export interface Lt extends Token {
  _type: 'Lt';
}

export interface And extends Token {
  _type: 'And';
}

export interface Brace extends Token {
  _type: 'Brace';
}

export interface Semi extends Token {
  _type: 'Semi';
}

export interface Let extends Token {
  _type: 'Let';
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