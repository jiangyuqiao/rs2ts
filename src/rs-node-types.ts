export type NodeType = 'File' | 'ItemFn' | 'Block' | 'Signature' | 'Brace' | 'Ident';

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

export interface Visibility {
  _type: 'Visibility::Inherited'
}

export interface Token {
  span: Span;
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

export interface Signature extends BaseNode {
  _type: "Signature"
  abi: undefined;
  asyncness: undefined;
  constness: undefined;
  unsafety: undefined;
  variadic: undefined;
  fn_token: Token;
  ident: Ident;
  /*
  generics: {_type: 'Generics', lt_token: undefined, params: {…}, gt_token: undefined, where_clause: undefined, …}
  inputs: {0: {…}, 1: {…}, 2: {…}, _type: 'Punctuated', length: 3}
  output: {_type: 'ReturnType::Default'}
  paren_token: {_type: 'Paren', span: {…}}
  */
}

export interface ItemFn extends BaseNode {
  _type: "ItemFn";
  vis: Visibility;
  sig: Signature;
  block: Block;
}
