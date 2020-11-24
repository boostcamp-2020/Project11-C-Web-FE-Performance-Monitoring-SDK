// 브라우저에서 동작하는 js 에러 전부 캡쳐
import sendLog from './HttpTransport';

export default function setBroswerErrorCaptureHandler() {
  console.log('start capturing error');

  window.onunhandledrejection = function (e) {
    console.log(e.reason);

    const data = {
      content: e.reason.message + e.reason.stack,
      date: new Date(),
      env: {},
    };
    console.log(data);
    sendLog(data).then(res => {
      console.log(res);
    });
  };

  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    const data = {
      content:
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
        errorObj.stack,
      date: new Date(),
      env: {},
    };

    console.log(data);
    sendLog(data).then(res => {
      console.log(res);
    });
  };
}
