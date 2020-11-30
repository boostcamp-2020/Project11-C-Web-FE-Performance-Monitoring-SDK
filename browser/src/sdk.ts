import { pocket } from '@acent/core';
export declare const defaultOptions: {};

const init = (options: any) => {
  if (options === void 0) {
    // 사용자가 기본 옵션도 부여하지 않았을 경우의 대처가 필요
    options.defaultOptions = defaultOptions;
  } else {
    if (options.dsn === void 0) {
      //dsn을 입력하지 않았다면 어떻게 할까?
    }

    if (options.env === void 0) {
      process.env.NODE_ENV =
        process.env.NODE_ENV &&
        process.env.NODE_ENV.trim().toLowerCase() == 'production'
          ? 'production'
          : 'development';

      options.env = process.env.NODE_ENV;
    }

    pocket.putOptions(options);
  }
};

export { init };
