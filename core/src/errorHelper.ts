import * as fs from 'fs';

const errorParser = (error: Error) => {
  const errorPathInfo: string = error.stack.split('\n')[1];

  const lineNumberReg: RegExp = /\d+/;
  const errorLineNumber: number =
    parseInt(lineNumberReg.exec(errorPathInfo)[0]) - 1;

  const endReg: RegExp = /:\d+/;
  const splitToken: string = endReg.exec(errorPathInfo)[0];

  return { errorPathInfo, errorLineNumber, splitToken };
};

const errorTracer = (err: Error) => {
  const { errorPathInfo, errorLineNumber, splitToken } = errorParser(err);
  const errMap: Map<number, string> = new Map();
  const filePath: string = errorPathInfo
    .trim()
    .split(' ')[1]
    .split(splitToken)[0]
    .replace(/\\/g, '/');

  const content: any = fs.readFileSync(filePath, 'utf8');
  const fileLines: Array<string> = content.split('\r\n');
  const startIndex: number = errorLineNumber - 6 >= 0 ? errorLineNumber - 6 : 0;
  const endIndex: number =
    errorLineNumber + 6 < fileLines.length
      ? errorLineNumber + 6
      : fileLines.length - 1;

  fileLines.map((value, index) => {
    if (index < endIndex && index > startIndex) {
      errMap.set(index + 1, value);
    }
  });

  const errorArea: any = {
    key: [],
    value: [],
  };
  errMap.forEach((value, key, map) => {
    errorArea.key.push(key);
    errorArea.value.push(value);
  });

  return errorArea;
};

export { errorTracer, errorParser };
