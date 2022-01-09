import { File } from './node-types';
import { preProcess } from './pre-process';
const wasm_syn = import('astexplorer-syn');

export function parse(code: string): Promise<File> {
  return wasm_syn
    .then(m => m.default)
    .then((m) => {
      const treeNode = m.parseFile(code) as File;
      console.log('rust', JSON.parse(JSON.stringify(treeNode)));
      preProcess(treeNode);
      return treeNode;
    });
}