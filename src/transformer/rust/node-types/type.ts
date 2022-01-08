import { BaseNode } from './common';
import { And } from './token';
import { Path } from './path'

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