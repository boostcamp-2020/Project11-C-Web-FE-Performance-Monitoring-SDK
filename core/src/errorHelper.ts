import * as fs from 'fs';

const errorParser = (error: Error) => {
  const errorPathInfo: string = error.stack.split('\n')[1];

  const errReg: RegExp = /(.js|.jsx|.ts|.tsx):\d+/;
  const errorLine: string = errReg.exec(errorPathInfo)[0];
  const errorLineNumber: number = parseInt(errorLine.split(':')[1]) - 1;

  const endReg: RegExp = /:\d+/;
  const splitToken: string = endReg.exec(errorLine)[0];

  return { errorPathInfo, errorLineNumber, splitToken };
};

const errorTracer = (err: Error) => {
  const { errorPathInfo, errorLineNumber, splitToken } = errorParser(err);
  const errMap: Map<number, string> = new Map();

  const lineArray: string[] = errorPathInfo.trim().split(' ');
  let pathInfo: string = lineArray[lineArray.length - 1];

  if (pathInfo.charAt(0) === '(') {
    pathInfo = pathInfo.replace(/\(/, '');
    pathInfo = pathInfo.replace(/\)/, '');
  }

  const filePath: string = pathInfo.split(splitToken)[0].replace(/\\/g, '/');

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
