import { BaseNode, Ident, Punctuated } from './common';
import { Visibility } from './data';
import { Block } from './stmt';
import { Generics } from './generics';
import { PatType } from './pat';
import { Type } from './type';
import { Token, Comma, RArrow } from './token';

export interface ItemFn extends BaseNode {
  _type: 'ItemFn';
  vis: Visibility;
  sig: Signature;
  block: Block;
}

export interface Signature extends BaseNode {
  _type: 'Signature'
  abi: undefined;
  asyncness: undefined;
  constness: undefined;
  unsafety: undefined;
  variadic: undefined;
  fn_token: Token;
  ident: Ident;
  inputs: Punctuated<PatType | Comma>;
  output: ReturnType_Default | ReturnType_Type;
  generics: Generics;
  /*
  paren_token: {_type: 'Paren', span: {…}}
  */
}

export interface ReturnType_Default {
  _type: 'ReturnType::Default';
}

export interface ReturnType_Type extends BaseNode {
  0: RArrow;
  1: Type;
  _type: 'ReturnType::Type';
}