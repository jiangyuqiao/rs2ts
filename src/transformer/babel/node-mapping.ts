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
  { type: 'Path', source: rs.Path, target: ts.GenericTypeAnnotation | ts.Expression } |
  { type: 'TypePath', source: rs.TypePath, target: ts.GenericTypeAnnotation } |
  { type: 'TypeReference', source: rs.TypeReference, target: ts.GenericTypeAnnotation } |
  { type: 'Stmt::Semi', source: rs.Stmt_Semi, target: ts.ExpressionStatement } |
  { type: 'ExprCall', source: rs.ExprCall, target: ts.CallExpression | ts.ReturnStatement } |
  { type: 'ExprTry', source: rs.ExprTry, target: ts.Expression } |
  { type: 'ExprPath', source: rs.ExprPath, target: ts.Expression } |
  { type: 'Local', source: rs.Local, target: ts.VariableDeclaration };
