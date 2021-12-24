import { File } from './node-types';
const wasm_syn = import('astexplorer-syn');

export function parse(code: string): Promise<File> {
  return wasm_syn.then(m => m.default).then(m => m.parseFile(code));
}