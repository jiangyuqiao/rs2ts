import * as ts from '@babel/types';
import * as rs from '../rust/node-types';

export type NodeMappings = _NodeMappings | {
  type: '__BaseNode__', source: rs.BaseNode, target: ts.BaseNode
};

type _NodeMappings =
  { type: 'File', source: rs.File, target: ts.File } |
  { type: 'ItemFn', source: rs.ItemFn, target: ts.FunctionDeclaration } |
  { type: 'Ident', source: rs.Ident, target: ts.Identifier } |
  { type: 'PatType', source: rs.PatType, target: ts.Identifier } |
  { type: 'PathSegment', source: rs.PathSegment, target: ts.GenericTypeAnnotation } |
  { type: 'TypePath', source: rs.TypePath, target: ts.GenericTypeAnnotation } |
  { type: 'TypeReference', source: rs.TypeReference, target: ts.GenericTypeAnnotation };
