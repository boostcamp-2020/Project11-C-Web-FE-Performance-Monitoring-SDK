import { pocket } from '@acent/core';
export declare const defaultOptions: {};

const init = (options: any) => {
  if (options === void 0) {
    console.warn('Acent를 시작할 때 반드시 dsn 옵션을 설정해주세요.');
    options.defaultOptions = defaultOptions;
  } else {
    if (options.dsn === void 0) {
      console.warn('Acent를 시작할 때 반드시 dsn 옵션을 설정해주세요.');
    }

    if (options.env === void 0) {
      //  process.env.NODE_ENV?.trim().toLowerCase() == 'production'

      process.env.NODE_ENV =
        process.env.NODE_ENV &&
        process.env.NODE_ENV.trim().toLowerCase() == 'production'
          ? 'production'
          : 'development';
      // option?.default 물음표, 쌍물음표 연산자 => plugin 설치
      options.env = process.env.NODE_ENV;
    }

    pocket.putOptions(options);
  }
};

export { init };
