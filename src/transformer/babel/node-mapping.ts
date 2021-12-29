import * as ts from '@babel/types';
import * as rs from '../rust/node-types';

export type TransformFn = UnionToIntersection<F<
  NodeMappings | { source: rs.BaseNode, target: ts.Node }
>>;

type F<T> = T extends {
  source: infer Source,
  target: infer Target
} ? (source: Source) => Target : never;

type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends (k: infer I) => void
  ? I
  : never;

type NodeMappings =
  { source: rs.File, target: ts.File } |
  { source: rs.Ident, target: ts.Identifier } |
  { source: rs.PatType, target: ts.Identifier } |
  { source: rs.PathSegment | rs.TypePath | rs.TypeReference, target: ts.GenericTypeAnnotation };
