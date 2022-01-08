import { BaseNode, Ident, Punctuated } from './common';
import { Type } from './type';
import { Comma, Colon2, Gt, Lt } from './token';

export type GenericArgument =
  // Lifetime | // A lifetime argument.
  Type // | // A type argument.
  // Binding | // A binding (equality constraint) on an associated type: the `Item = u8` in `Iterator<Item = 8>`.
  // Constraint | // An associated type bound: `Iterator<Item: Display>`.
  // Expr | // A const expression. Must be inside of a block.
;

export interface AngleBracketedGenericArguments extends BaseNode {
  type: 'AngleBracketedGenericArguments';
  args: Punctuated<GenericArgument | Comma>;
  colon2_token: Colon2;
  gt_token: Gt;
  lt_token: Lt;
}

export interface PathSegment extends BaseNode {
  _type: 'PathSegment';
  ident: Ident;
  arguments:
    { _type: 'PathArguments::None' } |
    AngleBracketedGenericArguments |
    { _type: 'ParenthesizedGenericArguments' }; // todo
}

export interface Path extends BaseNode {
  _type: 'Path'
  leading_colon: undefined;
  segments: Punctuated<PathSegment | Colon2>;
}