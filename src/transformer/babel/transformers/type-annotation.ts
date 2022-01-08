import * as rs from '../../rust/node-types';
import * as ts from '@babel/types';
import { register } from './registry';
import {
  convertIdentifierNameString,
  convertTypeNameString,
  convertPunctuatedToArray
} from '../../utils';
import { Context } from '../types';

export function wrapTypeAnnotation(node?: ts.GenericTypeAnnotation): ts.TypeAnnotation | undefined {
  return node ? ts.typeAnnotation(node) : undefined;
}

type BaseTypeAnnotation = {
  type: `${string}TypeAnnotation`
};

function convertToGenericTypeParams(
  item: rs.AngleBracketedGenericArguments,
  transformerContext: Context
): BaseTypeAnnotation[] {
  const args = convertPunctuatedToArray(item.args)
    .filter(n => n._type === 'TypePath') as rs.TypePath[];
  return args.map(path => transformerContext.t(path as rs.TypePath));
}

function generateGenericTypeAnnotation(
  id: ts.Identifier | ts.QualifiedTypeIdentifier,
  typeParam?: BaseTypeAnnotation[]
): ts.GenericTypeAnnotation {
  let typeParamI: ts.TypeParameterInstantiation;
  if (typeParam) {
    typeParamI = ts.typeParameterInstantiation([]);
    typeParamI.params = typeParam as ts.FlowType[];
  }
  return ts.genericTypeAnnotation(
    id,
    typeParamI
  );
}

const numAnnotation = ts.numberTypeAnnotation();
const strAnnotation = ts.stringTypeAnnotation();

const BuiltInTypes = {
  'bool': ts.booleanTypeAnnotation(),
  'String': strAnnotation,
  'str': strAnnotation
};

[
  'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
  'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
  'f64', 'f32'
].forEach(t => BuiltInTypes[t] = numAnnotation);

register('PathSegment', function (node, c) {
  const typeName = convertTypeNameString(node.ident.to_string, c.options);
  if (node.arguments._type === 'PathArguments::None') {
    let annotation = BuiltInTypes[typeName];
    if (annotation) {
      return annotation;
    } else {
      return ts.genericTypeAnnotation(ts.identifier(typeName));
    }
  } else if (node.arguments._type === 'AngleBracketedGenericArguments') {
    const genericArgs = convertToGenericTypeParams(node.arguments, c);
    return generateGenericTypeAnnotation(
      ts.identifier(typeName),
      genericArgs
    );
  }
});

register('TypePath', function (node, c) {
  const segments = convertPunctuatedToArray(node.path.segments)
    .filter(n => n._type === 'PathSegment') as rs.PathSegment[];
  if (segments.length === 0) {
    throw new Error();
  }
  if (segments.length === 1) {
    return c.t(segments[0]);
  }

  const idStrArr = segments.map(s => convertTypeNameString(s.ident.to_string, c.options));
  const rootId = ts.identifier(idStrArr.shift());
  const secondId = ts.identifier(idStrArr.shift());
  let qtId = ts.qualifiedTypeIdentifier(secondId, rootId)
  while (idStrArr.length > 0) {
    const id = ts.identifier(idStrArr.shift());
    qtId = ts.qualifiedTypeIdentifier(id, qtId);
  }
  let typeParams: BaseTypeAnnotation[];
  if (segments[segments.length - 1].arguments?._type === 'AngleBracketedGenericArguments') {
    typeParams = convertToGenericTypeParams(
      segments[segments.length - 1].arguments as rs.AngleBracketedGenericArguments, c
    );
  }
  return generateGenericTypeAnnotation(qtId, typeParams);
});

register('PatType', function (node, c) {
  const id = ts.identifier(
    convertIdentifierNameString(node.pat.ident.to_string, c.options)
  );
  id.typeAnnotation = wrapTypeAnnotation(c.t(node.ty));
  return id;
});

register('TypeReference', function (node, c) {
  return c.t(node.elem);
});