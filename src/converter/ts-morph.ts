import { Project, ts } from 'ts-morph';

export function test() {
  const prj = new Project({ useInMemoryFileSystem: true });
  const file = prj.createSourceFile('code.ts', undefined, { scriptKind: ts.ScriptKind.TS });
  (window as any).prj = prj;
  (window as any).testFile = file;
  file.addFunction({})
  return prj.getSourceFiles();
}
