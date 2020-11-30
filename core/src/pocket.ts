const initOptions: { dsn: string; env: string } = {
  dsn: '',
  env: '',
};

const putOptions = (options: { dsn: string; env: string }) => {
  initOptions.dsn = options.dsn;
  initOptions.env = options.env;
};

let userInfo: {} = {};

const putInfo = (info: {}) => {
  userInfo = info;
};

export { putOptions, putInfo, initOptions, userInfo };
