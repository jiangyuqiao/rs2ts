import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';

export function processUnrecognizedNode(node: rs.BaseNode): ts.BaseNode {
  if (node.hasAbsType('Stmt')) {
    return ts.expressionStatement(ts.templateLiteral(
      [ts.templateElement({ raw: `Unrecognized Statement: ${node._type}`})],
      []
    ));
  }
  throw new Error(`unrecognized node: ${node._type}`);
}