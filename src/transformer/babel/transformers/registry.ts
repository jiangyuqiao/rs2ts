import * as rs from '../../rust/node-types';
import { NodeTransformerWithContext, Transformers, RegisterTransformer } from '../types';
import { processUnrecognizedNode } from './unrecognized';

export const transformers: Transformers = {};

export const register = function (nodeType: rs.NodeType, transformer) {
  if (transformers[nodeType] && transformers[nodeType] !== transformer) {
    console.warn(`[WARNING] ${nodeType} transformer registered more than one time`);
  }
  transformers[nodeType] = transformer;
} as unknown as RegisterTransformer;

export function getTransformer(nodeType: rs.NodeType): NodeTransformerWithContext {
  const transformer = transformers[nodeType];
  if (!transformer) {
    return processUnrecognizedNode as NodeTransformerWithContext;
  }
  return transformer;
}

