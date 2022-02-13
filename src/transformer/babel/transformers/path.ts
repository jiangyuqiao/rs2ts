import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { convertPunctuatedToArray, convertIdentifierNameString } from '../../utils';
import { Context } from '../types';
import { register } from './registry';
import { convertSegmentsInTypePath } from './type-annotation';

function convertSegmentsInExprPath(
  segments: rs.PathSegment[],
  context: Context
) {
  const idStrArr = segments.map(
    s => context.t(s.ident)
  );
  if (idStrArr.length === 1) {
    return idStrArr[0];
  }
  const rootId = idStrArr.shift();
  const secondId = idStrArr.shift();
  let memberExp = ts.memberExpression(rootId, secondId);
  while (idStrArr.length > 0) {
    const id = idStrArr.shift();
    memberExp = ts.memberExpression(memberExp, id);
  }
  return memberExp;
}

register('ExprPath', function (node, c) {
  return c.t(node.path) as ts.Expression;
});

register('Path', function (node, c) {
  const segments = convertPunctuatedToArray(node.segments).filter(n => n.isTypeOf('PathSegment')) as rs.PathSegment[];;
  if (segments.length === 0) {
    throw new Error();
  }

  const parentNode = node.getParent();
  if (parentNode) {
    if (parentNode.isTypeOf('TypePath')) {
      return convertSegmentsInTypePath(segments, c);
    } else if (parentNode.isTypeOf('ExprPath')) {
      return convertSegmentsInExprPath(segments, c);
    }
  }
  throw new Error('unrecognized Path node');
});