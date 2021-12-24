const STORAGE_KEY = 'code';

function write(input: string) {
  localStorage.setItem(STORAGE_KEY, input);
}

function read(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export { read, write };