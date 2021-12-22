import { parseRustCode } from './rs-parser';
import { convertItem, NodeType } from './converter/babel';
import { generate } from './converter/babel/code-generator';

const testCode = `
fn test(x: usize, y: usize) {
  if (x > y) {
    x
  } else {
    y
  }
}
`;

async function convertCode() {
  const rsAST = await parseRustCode(testCode);
  const tsAST = convertItem(rsAST as NodeType.File);
  console.log(generate(tsAST));
}

function traverse(treeNode: object, parent: object) {

}

convertCode();