import { BaseNode } from './common';
import { Brace } from './token';

export interface Block extends BaseNode {
  _type: 'Block';
  stmts: BaseNode[];
  brace_token: Brace;
}