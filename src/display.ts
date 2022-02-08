import type { editor } from 'monaco-editor';
import * as storage from './storage';

const monacoImport = import('monaco-editor');

let inputEditor: editor.IStandaloneCodeEditor;
let outputEditor: editor.IStandaloneCodeEditor;

const CommonOptions: editor.IStandaloneEditorConstructionOptions = {
  codeLens: false,
  minimap: { enabled: false },
  wordWrap: 'on'
};

const testCode =
`fn test(x: usize, y: usize) {
  if (x > y) {
    x
  } else {
    y
  }
}
`;

export function init() {
  return new Promise<void>((resolve) => {
    window.addEventListener('load', function () {
      monacoImport.then((monaco) => {
        inputEditor = monaco.editor.create(document.querySelector('#source'), {
          ...CommonOptions, value: storage.read() || testCode, language: 'rust'
        });
        outputEditor = monaco.editor.create(document.querySelector('#target'), {
          ...CommonOptions, language: 'typescript'
        });
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true
        });
        resolve();
      });
    });
  });
}

export function onInputChange(listener: (...args: any) => void) {
  if (!inputEditor) {
    throw new Error('not inited yet');
  }
  return inputEditor.getModel().onDidChangeContent(listener);
}

export function getInput() {
  if (!inputEditor) {
    throw new Error('not inited yet');
  }
  return inputEditor.getValue();
}

export function setOutput(content: string) {
  if (!outputEditor) {
    throw new Error('not inited yet');
  }
  outputEditor.setValue(content)
}
