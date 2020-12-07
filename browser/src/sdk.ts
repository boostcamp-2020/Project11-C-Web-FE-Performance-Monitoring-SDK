import { pocket } from '@acent/core';
export declare const defaultOptions: {};

const init = (options: any) => {
  if (options === void 0) {
    alert('Acent를 시작할 때 반드시 dsn 옵션을 설정해주세요.');
  } else {
    if (options.dsn === void 0) {
      alert('Acent를 시작할 때 반드시 dsn 옵션을 설정해주세요.');
    }

    if (options.env === void 0) {
      // process.env.NODE_ENV =
      //   process.env.NODE_ENV &&
      //   process.env.NODE_ENV.trim().toLowerCase() == 'production'
      //     ? 'production'
      //     : 'development';

      options.env = 'development';
    }

    pocket.putOptions(options);
  }
};

export { init };
