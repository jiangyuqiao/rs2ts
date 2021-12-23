import { transformToTSCode, Options } from './transformer';

const testCode = `
fn test(x: usize, y: usize) {
  if (x > y) {
    x
  } else {
    y
  }
}
`;

async function startTransform(rs: string, options: Options) {
  const code = await transformToTSCode(rs, options);
  return code;
}

startTransform(testCode, {}).then(r => console.log(r));
