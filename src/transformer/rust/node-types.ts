export type NodeType = 'File' | 'ItemFn' | 'Block' | 'Signature' | 'Brace' | 'Ident' | 'PatIdent' | 'PatType' | 'TypePath' | 'Path' | 'PathSegment' | 'ReturnType::Type' | 'Generics' | 'AngleBracketedGenericArguments';

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

export interface Visibility {
  _type: 'Visibility::Inherited'
}

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

export interface BaseNode {
  attrs: any[];
  span: Span;
  _type: NodeType;
}

export interface File extends BaseNode {
  _type: 'File';
  items: BaseNode[];
}

export interface Ident extends BaseNode {
  _type: 'Ident';
  to_string: string;
}

export interface Brace extends BaseNode {
  _type: 'Brace';
}

export interface Block extends BaseNode {
  _type: 'Block';
  stmts: BaseNode[];
  brace_token: Brace;
}

export interface PatIdent extends BaseNode {
  _type: 'PatIdent';
  ident: Ident;
  by_ref: undefined;
  mutability: undefined;
  subpat: undefined;
}

export interface AngleBracketedGenericArguments extends BaseNode {
  type: 'AngleBracketedGenericArguments';
  args: Punctuated<TypePath | Comma>;
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

export interface TypePath extends BaseNode {
  _type: 'TypePath';
  path: Path;
  qself: undefined;
}

export interface PatType extends BaseNode {
  _type: 'PatType';
  colon_token: Colon;
  pat: PatIdent;
  ty: TypePath
}

export interface ReturnType_Default {
  _type: 'ReturnType::Default';
}

export interface ReturnType_Type extends BaseNode {
  0: RArrow;
  1: TypePath;
  _type: 'ReturnType::Type';
}

export interface Generics extends BaseNode {
  _type: 'Generics';
  // todo
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

export interface ItemFn extends BaseNode {
  _type: 'ItemFn';
  vis: Visibility;
  sig: Signature;
  block: Block;
}
