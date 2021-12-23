import * as rs from '../../rust/node-types';
import { TreeNodeTransformer, Transformers } from '../types';

export const transformers: Transformers = {};

export function register(nodeType: rs.NodeType, transformer: TreeNodeTransformer) {
  if (transformers[nodeType] && transformers[nodeType] !== transformer) {
    console.warn(`[WARNING] ${nodeType} transformer registered more than one time`);
  }
  transformers[nodeType] = transformer;
}