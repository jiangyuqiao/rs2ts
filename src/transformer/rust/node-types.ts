export type NodeType = 'File' | 'ItemFn' | 'Block' | 'Signature' | 'Brace' | 'Ident' | 'PatIdent' | 'PatType' | 'TypePath' | 'TypeReference' | 'Path' | 'PathSegment' | 'ReturnType::Type' | 'Generics' | 'AngleBracketedGenericArguments';

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

export interface And extends Token {
  _type: 'And';
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

export interface TypePath extends BaseNode {
  _type: 'TypePath';
  path: Path;
  qself: undefined;
}

export interface TypeReference extends BaseNode {
  _type: 'TypeReference';
  and_token: And;
  elem: Type;
  lifetime: undefined
  mutability: undefined
}

export type Type =
  // TypeArray | // A fixed size array type: `[T; n]`.
  // TypeBareFn | // A bare function type: `fn(usize) -> bool`.
  // TypeGroup | // A type contained within invisible delimiters.
  // TypeImplTrait | // An `impl Bound1 + Bound2 + Bound3` type where `Bound` is a trait or a lifetime.
  // TypeInfer | // Indication that a type should be inferred by the compiler: `_`.
  // TypeMacro | // A macro in the type position.
  // TypeNever | // The never type: `!`.
  // TypeParen | // A parenthesized type equivalent to the inner type.
  TypePath | // A path like `std::slice::Iter`, optionally qualified with a self-type as in `<Vec<T> as SomeTrait>::Associated`.
  // TypePtr | // A raw pointer type: `*const T` or `*mut T`.
  TypeReference // A reference type: `&'a T` or `&'a mut T`.
  // TypeSlice | // A dynamically sized slice type: `[T]`.
  // TypeTraitObject | // A trait object type `Bound1 + Bound2 + Bound3` where `Bound` is a trait or a lifetime.
  // TypeTuple | // A tuple type: `(A, B, C, String)`.
  // TokenStream | // Tokens in type position not interpreted by Syn.
;

export interface PatType extends BaseNode {
  _type: 'PatType';
  colon_token: Colon;
  pat: PatIdent;
  ty: Type;
}

export interface ReturnType_Default {
  _type: 'ReturnType::Default';
}

export interface ReturnType_Type extends BaseNode {
  0: RArrow;
  1: Type;
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
