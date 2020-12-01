import { transport, errorHelper, pocket } from '@acent/core';

const startErrorCapturing = () => {
  window.onunhandledrejection = async (event: PromiseRejectionEvent) => {
    console.log(event.reason);

    const data = {
      content: `name: ${`${event.reason.name}`}   \n  errmsg:${
        event.reason.message
      } \n stackmsg:${event.reason.stack} `,
      errArea: {},
      userInfo: {},
      date: new Date(),
    };

    const errorId: string | boolean = await transport.sendLog(data);
    console.log(errorId);
  };

  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    const data = {
      content: `Error: ${errorMsg}\nScript: ${url}\nLine: ${lineNumber}\nColumn: ${column}\nStack trace: ${errorObj}\n${errorObj.stack}`,
      errArea: {},
      userInfo: {},
      date: new Date(),
    };

    transport.sendLog(data).then(res => {
      console.log(res);
    });
  };
};

export { startErrorCapturing };
