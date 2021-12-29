import * as ts from '@babel/types';
import * as rs from '../rust/node-types';
import { Options } from '../types';
import { Transformers, TransformFn } from './types';
import { transformers } from './transformers';

class Transformer {
  transformers: Transformers;
  options: {};
  constructor(transformers: Transformers, options: Options) {
    this.transformers = transformers;
    this.options = options;
  }

  transformTreeNode: TransformFn = (node) => {
    const transformer = this.transformers[node._type];
    if (!transformer) {
      throw new Error(`unrecognized node type: ${node._type}`);
    }
    return transformer(node, {
      options: this.options,
      transform: this.transformTreeNode,
      t: this.transformTreeNode
    });
  }
}

export function transform(node: rs.BaseNode, options?: Options): ts.Node {
  const transformer = new Transformer(transformers, options);
  return transformer.transformTreeNode(node);
}