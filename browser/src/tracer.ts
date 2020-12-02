import { transport, pocket } from '@acent/core';

const recentErrorId: { value: string } = { value: '' };

const getUserInfo = () => {
  return {
    browser: navigator.userAgent,
    appVersion: navigator.appVersion,
    languages: navigator.languages,
    platform: navigator.platform,
    hostName: window.location.hostname,
    port: window.location.port,
    url: window.location.href,
    errorId: '',
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
    if (typeof errorId === 'string') {
      recentErrorId.value = errorId;
    }
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
      if (typeof res === 'string') {
        recentErrorId.value = res;
      }
    });
  };
};

export { startErrorCapturing, recentErrorId };
