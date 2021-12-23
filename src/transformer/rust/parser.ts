import { File } from './node-types';
const wasm_syn = import('astexplorer-syn');

export async function parse(code: string): Promise<File> {
  return (await wasm_syn).parseFile(code);
}