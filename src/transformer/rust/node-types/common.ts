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

export interface BaseNode {
  attrs: any[];
  span: Span;
  _type: NodeType;

  isTypeOf(typeName: string): boolean;
  hasAbsType(typeName: string): boolean;
  addAbsType(typeName: string): void;
}

export interface File extends BaseNode {
  _type: 'File';
  items: BaseNode[];
}

export interface Ident extends BaseNode {
  _type: 'Ident';
  to_string: string;
}
