import { PatTypeName } from './pat';
import { ExprTypeName } from './expr';
import { TokenTypeName, Colon } from './token';

export type NodeType = 'File' | 'ItemFn' | 'Block' | 'Signature' | 'Brace' | 'Ident' | 'Index' | 'TypePath' | 'TypeReference' | 'Path' | 'PathSegment' | 'ReturnType::Type' | 'ReturnType::Default' | 'Generics' | 'AngleBracketedGenericArguments' |  'Stmt::Semi' | 'Local' | 'LitStr' | 'LitByteStr' | 'LitByte' | 'LitChar' | 'LitInt' | 'LitFloat' | 'LitBool' | PatTypeName | ExprTypeName | TokenTypeName;

export type AbstractType = 'Stmt' | 'Expr' | 'Pat' | 'Type';

export interface LineColumn {
  _type: 'LineColumn';
  line: number;
  column: number;
}

export interface Span {
  _type: 'Span';
  start: LineColumn;
  end: LineColumn;
}

/**
 * an array-like object
 */
export interface Punctuated<T> {
  [n: number]: T;
  length: number;
}

export interface BaseNode {
  attrs: any[];
  span: Span;
  _type: NodeType;

  isTypeOf(typeName: string): boolean;
  isTypeAmong(typeNames: string[]): boolean;
  hasAbsType(typeName: string): boolean;
  addAbsType(typeName: string): void;
  getType(): string;
  getParent(): BaseNode | void;
}

export interface File extends BaseNode {
  _type: 'File';
  items: BaseNode[];
}

export interface Ident extends BaseNode {
  _type: 'Ident';
  to_string: string;
}

export interface Label extends BaseNode {
  name: Lifetime,
  colon_token: Colon,
}

export interface Lifetime extends BaseNode {
  apostrophe: Span;
  ident: Ident;
}
