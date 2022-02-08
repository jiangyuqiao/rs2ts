import { BaseNode, Ident } from './common';
import { Type } from './ty';
import { Colon, Mut } from './token';

export const PatTypeNames = ['PatBox', 'PatIdent', 'PatLit', 'PatMacro', 'PatOr', 'PatPath', 'PatRange', 'PatReference', 'PatRest', 'PatSlice', 'PatStruct', 'PatTuple', 'PatTupleStruct', 'PatType', 'PatWild'] as const;
export type PatTypeName = typeof PatTypeNames[number];

export type Pat = PatIdent | PatType;

export interface PatIdent extends BaseNode {
  _type: 'PatIdent';
  ident: Ident;
  by_ref: undefined;
  mutability: Mut;
  subpat: undefined;
}

export interface PatType extends BaseNode {
  _type: 'PatType';
  colon_token: Colon;
  pat: PatIdent;
  ty: Type;
}