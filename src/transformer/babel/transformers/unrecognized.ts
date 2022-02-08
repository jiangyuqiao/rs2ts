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
    return ts.expressionStatement(ts.templateLiteral(
      [ts.templateElement({
        raw: `/* Unrecognized Statement(${node._type}) */` + (
          sourceCode ? `\n${sourceCode}\n` : ''
        )
      })], []
    ));
  }
  if (node.hasAbsType('Expr')) {
    let altTxt = `/* Unrecognized Expression(${node._type}) */`;
    if (sourceCode) {
      if (hasMultiLines) {
        altTxt += `\n${sourceCode}\n`;
      } else {
        altTxt += ` ${sourceCode}`;
      }
    }
    return ts.templateLiteral(
      [ts.templateElement({ raw: altTxt })], []
    );
  }
  throw new Error(`unrecognized node: ${node._type}`);
}