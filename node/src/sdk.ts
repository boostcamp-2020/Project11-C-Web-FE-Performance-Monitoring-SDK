export declare const defaultIntegrations: {};

const init = (options: any) => {
  if (options === void 0) {
    console.log('options');
    options = {};
  }

  //dsn 설정
  if (options.dsn === void 0) {
    console.log('dsn');
    options.dsn = 'dsn';
  }

  //버전 설정
  if (options.release === void 0) {
    options.release = '0.0.1';
  }

  //환경 설정
  if (options.environment === void 0) {
    options.environment = 'dev';
  }
};

export { init };
