// 브라우저에서 동작하는 js 에러 전부 캡쳐
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    'Error: ' +
      errorMsg +
      ' Script: ' +
      url +
      ' Line: ' +
      lineNumber +
      ' Column: ' +
      column +
      ' StackTrace: ' +
      errorObj +
      errorObj.stack
  );
};
