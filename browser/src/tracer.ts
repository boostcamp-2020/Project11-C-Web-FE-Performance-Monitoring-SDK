import { transport, pocket } from '@acent/core';

const recentErrorId: { value: string } = { value: '' };
interface TagsType {
  browser: string;
  appVersion: string;
  languages: string;
  platform: string;
  hostName: string;
  port: string;
  url: string;
}

const getUserInfo = () => {
  return {
    browser: navigator.userAgent,
    appVersion: navigator.appVersion,
    languages: navigator.language,
    platform: navigator.platform,
    hostName: window.location.hostname,
    port: window.location.port,
    url: window.location.href,
  };
};

const startErrorCapturing = () => {
  window.onunhandledrejection = async (event: PromiseRejectionEvent) => {
    const tags: TagsType = getUserInfo();
    pocket.putInfo(tags);

    const data = {
      name: event.reason.name,
      message: event.reason.message,
      stack: event.reason.stack,
      errArea: {},
      tags: tags,
      date: new Date().getTime(),
    };

    const errorId: string | boolean = await transport.sendLog(data);
    if (typeof errorId === 'string') {
      recentErrorId.value = errorId;
    }
  };

  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    const tags: TagsType = getUserInfo();
    pocket.putInfo(tags);

    const data = {
      name: errorObj.name,
      message: errorObj.message,
      stack: errorObj.stack,
      errArea: {},
      tags: tags,
      date: new Date().getTime(),
    };

    transport.sendLog(data).then(res => {
      if (typeof res === 'string') {
        recentErrorId.value = res;
      }
    });
  };
};

export { startErrorCapturing, recentErrorId };
