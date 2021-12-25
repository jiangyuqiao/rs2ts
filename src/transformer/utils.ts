import { Punctuated } from './rust/node-types';
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import { Options } from './types';

function isUpperCase(t: string) {
  return t.toUpperCase() === t;
}

export function convertIdentifierNameString(name: string, o: Options) {
  if (o.toCamelCase) {
    return camelCase(name);
  }
  return name;
}

export function convertTypeNameString(name: string, o: Options) {
  if (o.toCamelCase) {
    let str = camelCase(name);
    if (isUpperCase(name[0])) {
      str = upperFirst(str)
    }
    return str;
  }
  return name;
}

export function convertPunctuatedToArray<T>(punctuated: Punctuated<T>): T[] {
  return Array.from(punctuated);
}