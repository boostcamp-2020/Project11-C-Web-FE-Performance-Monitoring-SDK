import { transport, pocket } from '@acent/core';

const getUserInfo = () => {
  return {
    browser: navigator.userAgent,
    appVersion: navigator.appVersion,
    languages: navigator.languages,
    platform: navigator.platform,
    hostName: window.location.hostname,
    port: window.location.port,
    url: window.location.href,
  };
};

const startErrorCapturing = () => {
  window.onunhandledrejection = async (event: PromiseRejectionEvent) => {
    const info: {} = getUserInfo();
    pocket.putInfo(info);

    const data = {
      content: `name: ${`${event.reason.name}`}   \n  errmsg:${
        event.reason.message
      } \n stackmsg:${event.reason.stack} `,
      errArea: {},
      userInfo: info,
      date: new Date(),
    };

    const errorId: string | boolean = await transport.sendLog(data);
    console.log(errorId);
  };

  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    const info: {} = getUserInfo();
    pocket.putInfo(info);

    const data = {
      content: `Error: ${errorMsg}\nScript: ${url}\nLine: ${lineNumber}\nColumn: ${column}\nStack trace: ${errorObj}\n${errorObj.stack}`,
      errArea: {},
      userInfo: info,
      date: new Date(),
    };

    transport.sendLog(data).then(res => {
      console.log(res);
    });
  };
};

export { startErrorCapturing };
