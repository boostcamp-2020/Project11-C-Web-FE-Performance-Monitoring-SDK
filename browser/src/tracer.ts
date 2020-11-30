import { transport, errorHelper, pocket } from '@acent/core';

const startErrorCapturing = () => {
  window.onunhandledrejection = async (event: PromiseRejectionEvent) => {
    console.log(event.reason);

    const data = {
      content: `name: ${`${event.reason.name}`}   \n  errmsg:${
        event.reason.message
      } \n stackmsg:${event.reason.stack} `,
      errArea: { none: 'none' },
      userInfo: { none: 'none' },
      date: new Date(),
    };

    const result: any = await transport.sendLog(data);
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
      errArea: { none: 'none' },
      userInfo: { none: 'none' },
      date: new Date(),
    };

    console.log(data);
    transport.sendLog(data).then(res => {
      console.log(res);
    });
  };
};

export { startErrorCapturing };
