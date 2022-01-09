import { Options } from './types';
const transformerModule = import('./babel');
const parserModule = import('./rust/parser');

async function transformToTSCode(rs: string, options: Options): Promise<string> {
  const [parser, transformer] = await Promise.all([parserModule, transformerModule]);
  const rustTreeNode = await parser.parse(rs);
  console.log('pre-processed:', rustTreeNode);
  const tsTreeNode = transformer.transform(rustTreeNode, rs, options);
  return transformer.generate(tsTreeNode);
}

export * from './types';
export {
  transformToTSCode
};
