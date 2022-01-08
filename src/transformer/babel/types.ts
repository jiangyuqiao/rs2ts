import * as ts from '@babel/types';
import * as rs from '../rust/node-types';
import { Options } from '../types';
import { NodeMappings } from './node-mapping';

type NodeTransformer = <Source extends NodeMappings['source']>(source: Source) => Extract<NodeMappings, { source: Source }>['target'];

type NodeTransformerWithContext = <Source extends NodeMappings['source']>(source: Source, context: Context) => Extract<NodeMappings, { source: Source }>['target'];

type RegisterTransformer = <Type extends NodeMappings['type']>(
  source: Type,
  transformer: (
    source: Extract<NodeMappings, { type: Type }>['source'], context: Context
  ) => Extract<NodeMappings, { type: Type }>['target']
) => void;

type Context = {
  options: Options;
  transform: NodeTransformer;
  /** shorthand of transform() */
  t: NodeTransformer;
};

type Transformers = { [rsNodeType in rs.NodeType]?: NodeTransformerWithContext };

export {
  Context,
  NodeTransformer,
  NodeTransformerWithContext,
  RegisterTransformer,
  Transformers
};

declare module '@babel/types' {
  interface SourceLocation {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  }
  interface BaseComment {
    value: string;
    start: number;
    end: number;
    loc: SourceLocation;
    type: "CommentBlock" | "CommentLine";
  }
  interface CommentBlock extends BaseComment {
    type: "CommentBlock";
  }
  interface CommentLine extends BaseComment {
    type: "CommentLine";
  }
  type Comment = CommentBlock | CommentLine;
  export interface BaseNode {
    leadingComments: ReadonlyArray<Comment> | null;
    innerComments: ReadonlyArray<Comment> | null;
    trailingComments: ReadonlyArray<Comment> | null;
    start: number | null;
    end: number | null;
    loc: SourceLocation | null;
    type: ts.Node["type"];
    range?: [number, number];
    extra?: Record<string, unknown>;
  }
}
