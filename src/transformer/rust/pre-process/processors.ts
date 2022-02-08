import * as t from '../node-types';
import { addAbsType } from './node-methods';
import { ExprTypeNames, PatTypeNames } from '../node-types';

export const Processors: { [key in t.NodeType]?: (node: t.BaseNode) => void } = {
  Block(node: t.Block) {
    for(const stmt of node.stmts) {
      addAbsType(stmt, 'Stmt');
    }
  }
};

export function commonProcessor(node: t.BaseNode) {
  if (isExpr(node)) {
    addAbsType(node, 'Expr');
  }
  if (isPat(node)) {
    addAbsType(node, 'Pat');
  }
}

function isExpr(node: t.BaseNode) {
  return node._type.startsWith('Expr') &&
    (ExprTypeNames as unknown as string[]).includes(node._type);
}

function isPat(node: t.BaseNode) {
  return node._type.startsWith('Pat') &&
    (PatTypeNames as unknown as string[]).includes(node._type);
}

function isType(node: t.BaseNode) {
  // TODO
}
