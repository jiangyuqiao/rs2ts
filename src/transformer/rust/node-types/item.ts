import { BaseNode, Ident, Punctuated } from './common';
import { Visibility } from './data';
import { Block } from './stmt';
import { Generics } from './generics';
import { PatType } from './pat';
import { Type } from './ty';
import { Token, Comma, RArrow } from './token';

export interface ItemFn extends BaseNode {
  _type: 'ItemFn';
  vis: Visibility;
  sig: Signature;
  block: Block;
}

export interface Signature extends BaseNode {
  _type: 'Signature'
  constness?: Token; // Token![const]
  asyncness?: Token; // Token![async]
  unsafety?: Token; // Token![unsafe]
  abi?: undefined; // Abi
  fn_token: Token; // Token![fn]
  ident: Ident;
  generics: Generics;
  // paren_token: {_type: 'Paren', span: {…}}
  inputs: Punctuated<PatType/*FnArg*/ | Comma>;
  variadic?: undefined; // Variadic
  output: ReturnType_Default | ReturnType_Type;
}

export interface ReturnType_Default {
  _type: 'ReturnType::Default';
}

export interface ReturnType_Type extends BaseNode {
  0: RArrow;
  1: Type;
  _type: 'ReturnType::Type';
}