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
  { type: 'PatIdent', source: rs.PatIdent, target: ts.Identifier } |
  { type: 'Path', source: rs.Path, target: ts.GenericTypeAnnotation | ts.Expression } |
  { type: 'TypePath', source: rs.TypePath, target: ts.GenericTypeAnnotation } |
  { type: 'TypeReference', source: rs.TypeReference, target: ts.GenericTypeAnnotation } |
  { type: 'Block', source: rs.Block, target: ts.BlockStatement } |
  { type: 'Stmt::Semi', source: rs.Stmt_Semi, target: ts.Statement } |
  { type: 'ExprCall', source: rs.ExprCall, target: ts.CallExpression } |
  { type: 'ExprMethodCall', source: rs.ExprMethodCall, target: ts.CallExpression } |
  { type: 'ExprField', source: rs.ExprField, target: ts.MemberExpression } |
  { type: 'ExprIf', source: rs.ExprIf, target: ts.CallExpression | ts.IfStatement } |
  { type: 'ExprClosure', source: rs.ExprClosure, target: ts.ArrowFunctionExpression } |
  { type: 'ExprLoop', source: rs.ExprLoop, target: ts.CallExpression | ts.WhileStatement } |
  { type: 'ExprWhile', source: rs.ExprWhile, target: ts.WhileStatement } |
  { type: 'ExprForLoop', source: rs.ExprForLoop, target: ts.ForOfStatement } |
  { type: 'ExprBlock', source: rs.ExprBlock, target: ts.BlockStatement } |
  { type: 'ExprBreak', source: rs.ExprBreak, target: ts.BreakStatement | ts.ReturnStatement } |
  { type: 'ExprContinue', source: rs.ExprContinue, target: ts.ContinueStatement } |
  { type: 'ExprReturn', source: rs.ExprReturn, target: ts.ReturnStatement } |
  { type: 'ExprTry', source: rs.ExprTry, target: ts.Expression } |
  { type: 'ExprPath', source: rs.ExprPath, target: ts.Expression } |
  { type: 'ExprBinary', source: rs.ExprBinary, target: ts.BinaryExpression } |
  { type: 'ExprUnary', source: rs.ExprUnary, target: ts.UnaryExpression } |
  { type: 'ExprArray', source: rs.ExprArray, target: ts.ArrayExpression } |
  { type: 'ExprAssign', source: rs.ExprAssign, target: ts.AssignmentExpression } |
  { type: 'ExprAssignOp', source: rs.ExprAssignOp, target: ts.AssignmentExpression } |
  { type: 'ExprLit', source: rs.ExprLit, target: ts.Literal } |
  { type: 'ExprParen', source: rs.ExprParen, target: ts.Expression } |
  { type: 'LitStr', source: rs.LitStr, target: ts.StringLiteral } |
  { type: 'LitChar', source: rs.LitChar, target: ts.StringLiteral } |
  { type: 'LitInt', source: rs.LitInt, target: ts.NumericLiteral } |
  { type: 'LitFloat', source: rs.LitFloat, target: ts.NumericLiteral } |
  { type: 'LitBool', source: rs.LitBool, target: ts.BooleanLiteral } |
  { type: 'Local', source: rs.Local, target: ts.VariableDeclaration };
