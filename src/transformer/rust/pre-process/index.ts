import { BaseNode } from '../node-types';
import { Node } from './node-methods';
import { Processors, commonProcessor } from './processors';

const ignoreTypes = ['Span', 'LineColumn'];
const ignoreKeys = ['_type', '_parent'];

export function preProcess(node: BaseNode, parent?: any) {
  if (!(node instanceof Object)) {
    return;
  }
  if (Array.isArray(node)) {
    for (const n of node) {
      preProcess(n, parent);
    }
  }
  if (!node._type) {
    return;
  }
  if (ignoreTypes.includes(node._type)) {
    return;
  }

  Reflect.setPrototypeOf(node, Node.prototype);
  if (parent) {
    (node as Node)._parent = parent;
  }
  const processor = Processors[node._type];
  if (processor) {
    processor(node);
  }
  commonProcessor(node);

  Object.keys(node).forEach((key) => {
    if (ignoreKeys.includes(key)) {
      return;
    }
    preProcess(node[key], node);
  });
}