import * as ts from '@babel/types';
import * as rs from '../rust/node-types';
import { Options } from '../types';
import { NodeTransformer } from './types';
import { getTransformer } from './transformers';

class Transformer {
  root: rs.BaseNode;
  sourceCode: string[];
  options: {};

  constructor(options: Options, sourceCode: string) {
    this.sourceCode = sourceCode.split('\n');
    this.options = options;
  }

  transformTreeNode = (node) => {
    const transformer = getTransformer(node._type);
    return transformer(node, {
      options: this.options,
      transform: this.transformTreeNode as NodeTransformer,
      t: this.transformTreeNode as NodeTransformer,
      getSourceCode: this.getSourceCode
    });
  };

  getSourceCode = (span?: rs.Span) => {
    if (!span) {
      return this.sourceCode.join('\n');
    }
    const lines = this.sourceCode.slice(span.start.line - 1, span.end.line);
    lines[0] = lines[0].slice(span.start.column);
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, span.end.column);
    return lines.join('\n');
  };

  transform() {
    return this.transformTreeNode(this.root);
  }
}

export function transform(node: rs.BaseNode, sourceCode: string, options?: Options): ts.BaseNode {
  const transformer = new Transformer(options, sourceCode);
  return transformer.transformTreeNode(node);
}
