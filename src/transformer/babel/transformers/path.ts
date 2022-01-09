import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { convertPunctuatedToArray, convertIdentifierNameString } from "../../utils";
import { Context } from '../types';
import { register } from "./registry";
import { convertSegmentsInTypePath } from './type-annotation';

function convertSegmentsInExprPath(
  segments: rs.PathSegment[],
  context: Context
) {
  const idStrArr = segments.map(
    s => convertIdentifierNameString(s.ident.to_string, context.options)
  );
  if (idStrArr.length === 1) {
    return ts.identifier(idStrArr[0]);
  }
  const rootId = ts.identifier(idStrArr.shift());
  const secondId = ts.identifier(idStrArr.shift());
  let memberExp = ts.memberExpression(rootId, secondId);
  while (idStrArr.length > 0) {
    const id = ts.identifier(idStrArr.shift());
    memberExp = ts.memberExpression(memberExp, id);
  }
  return memberExp;
}

register('ExprPath', function (node, c) {
  return c.t(node.path) as ts.Expression;
});

register('Path', function (node, c) {
  const segments = convertPunctuatedToArray(node.segments).filter(n => n._type === 'PathSegment') as rs.PathSegment[];;
  if (segments.length === 0) {
    throw new Error();
  }

  const parentType = (node.getParent() as rs.TypePath | rs.ExprPath)?._type;
  if (parentType === 'TypePath') {
    return convertSegmentsInTypePath(segments, c);
  } else if (parentType === 'ExprPath') {
    return convertSegmentsInExprPath(segments, c);
  }
  throw new Error('unrecognized Path node');
});