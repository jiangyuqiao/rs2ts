import * as ts from '@babel/types';
import * as rs from '../rust/node-types';
import { Options } from '../types';
import { TransformFn } from './node-mapping';

export type TreeNodeTransformer = (node: rs.BaseNode, context: Context) => ts.Node;
export type Transformers = { [rsNodeType in rs.NodeType]?: TreeNodeTransformer };
export type Context = {
  options: Options;
  transform: TransformFn;
  /** shorhand of transform() */
  t: TransformFn;
};

export { TransformFn };
