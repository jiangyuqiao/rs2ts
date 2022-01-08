import * as ts from '@babel/types';
import * as rs from '../rust/node-types';
import { Options } from '../types';
import { NodeTransformer } from './types';
import { getTransformer } from './transformers';

class Transformer {
  options: {};

  constructor(options: Options) {
    this.options = options;
  }

  transformTreeNode = (node) => {
    const transformer = getTransformer(node._type);
    return transformer(node, {
      options: this.options,
      transform: this.transformTreeNode as NodeTransformer,
      t: this.transformTreeNode as NodeTransformer
    });
  }
}

export function transform(node: rs.BaseNode, options?: Options): ts.BaseNode {
  const transformer = new Transformer(options);
  return transformer.transformTreeNode(node);
}
