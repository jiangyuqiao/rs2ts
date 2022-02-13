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
  if (rs.isStmt(node)) {
    const comment = ` Unrecognized Statement(${node.getType()}) `;
    const altStmt = ts.expressionStatement(ts.templateLiteral(
      [ts.templateElement({ raw: sourceCode })], []
    ));
    ts.addComment(altStmt, 'leading', comment);
    return altStmt;
  }
  if (rs.isExpr(node)) {
    const comment = ` Unrecognized Expression(${node.getType()}) `;
    const altExpr = ts.templateLiteral(
      [ts.templateElement({ raw: sourceCode })], []
    );
    ts.addComment(altExpr, 'leading', comment);
    return altExpr;
  }
  if (rs.isType(node)) {
    const typeAnnotation = ts.genericTypeAnnotation(ts.identifier(`__UNRECOGNIZED__${node.getType()}`));
    ts.addComment(typeAnnotation, 'trailing', sourceCode, false);
    return typeAnnotation;
  }
  if (rs.isPat(node)) {
    const id = ts.identifier(`__UNRECOGNIZED__${node.getType()}`);
    ts.addComment(id, 'trailing', sourceCode, false);
    return id;
  }
  throw new Error(`unrecognized node: ${node.getType()}`);
}