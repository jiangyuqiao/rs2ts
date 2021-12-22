const wasm_syn = import('astexplorer-syn');

export async function parseRustCode(code: string): Promise<object> {
  return (await wasm_syn).parseFile(code);
}