import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { Context } from '../types';

export function processUnrecognizedNode(node: rs.BaseNode, c: Context): ts.BaseNode {
  let sourceCode: string;
  let hasMultiLines = true;
  if (node.span) {
    sourceCode = c.getSourceCode(node.span);
    if (node.span.start.line === node.span.end.line) {
      hasMultiLines = false;
    }
  }
  if (node.hasAbsType('Stmt')) {
    const comment = ` Unrecognized Statement(${node._type}) `;
    const altStmt = ts.expressionStatement(ts.templateLiteral(
      [ts.templateElement({ raw: sourceCode })], []
    ));
    ts.addComment(altStmt, 'leading', comment);
    return altStmt;
  }
  if (node.hasAbsType('Expr')) {
    const comment = ` Unrecognized Expression(${node._type}) `;
    const altExpr = ts.templateLiteral(
      [ts.templateElement({ raw: sourceCode })], []
    );
    ts.addComment(altExpr, 'leading', comment);
    return altExpr;
  }
  if (node.hasAbsType('Type')) {
    const typeAnnotation = ts.genericTypeAnnotation(ts.identifier(`__UNRECOGNIZED__${node._type}`));
    ts.addComment(typeAnnotation, 'trailing', sourceCode, false);
    return typeAnnotation;
  }
  if (node.hasAbsType('Pat')) {
    const id = ts.identifier(`__UNRECOGNIZED__${node._type}`);
    ts.addComment(id, 'trailing', sourceCode, false);
    return id;
  }
  throw new Error(`unrecognized node: ${node._type}`);
}