import { BaseNode } from ".";

export type Lit = LitStr | LitByteStr | LitByte | LitChar | LitInt | LitFloat | LitBool | Literal;

// A UTF-8 string literal: `"foo"`.
export interface LitStr extends BaseNode {
  _type: 'LitStr';
  value: string;
  suffix: string;
}

// A byte string literal: `b"foo"`.
export interface LitByteStr extends BaseNode {
  _type: 'LitByteStr';

}

// A byte literal: `b'f'`.
export interface LitByte extends BaseNode {
  _type: 'LitByte';

}

// A character literal: `'a'`.
export interface LitChar extends BaseNode {
  _type: 'LitChar';
  value: string;
  suffix: string;
}

// An integer literal: `1` or `1u16`.
export interface LitInt extends BaseNode {
  _type: 'LitInt';
  digits: string;
  suffix: string;
}

// A floating point literal: `1f64` or `1.0e10f64`.
// Must be finite. May not be infinte or NaN.
export interface LitFloat extends BaseNode {
  _type: 'LitFloat';
  digits: string;
  suffix: string;
}

// A boolean literal: `true` or `false`.
export interface LitBool extends BaseNode {
  _type: 'LitBool';
  value: boolean;
}

// A raw token literal not interpreted by Syn.
export interface Literal extends BaseNode {

}
