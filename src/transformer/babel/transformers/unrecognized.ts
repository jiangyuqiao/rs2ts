import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { Context } from '../types';

export function processUnrecognizedNode(node: rs.BaseNode, c: Context): ts.BaseNode {
  if (node.hasAbsType('Stmt')) {
    let sourceCode: string;
    if (node.span) {
      sourceCode = c.getSourceCode(node.span);
    }
    return ts.expressionStatement(ts.templateLiteral(
      [ts.templateElement({
        raw: `// Unrecognized Statement(${node._type})` + (
          sourceCode ? ` below:\n${sourceCode}\n` : ''
        )
      })], []
    ));
  }
  throw new Error(`unrecognized node: ${node._type}`);
}