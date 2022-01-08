import * as t from '../node-types';
import { addAbsType } from './node-methods';

export const Processors: { [key in t.NodeType]?: (node: t.BaseNode) => void } = {
  Block(node: t.Block) {
    for(const stmt of node.stmts) {
      addAbsType(stmt, 'Stmt');
    }
  }
};
