import { transport, errorHelper, pocket } from '@acent/core';
import * as os from 'os';

const setRequestInfo = (req: Request) => {
  const requestInfo: {} = {
    browser: req.headers['user-agent'],
    language: req.headers['accept-language'],
    method: req.method,
    url: req.url,
    body: req.body,
    type: os.type(),
    arch: os.arch(),
    platform: os.platform(),
    hostName: os.hostname(),
    osVersion: os.version(),
    runtimeName: process.release.name,
    runtimeVersion: process.version,
  };

  pocket.putInfo(requestInfo);
};

const getStatusFromResponse = (err: Error) => {
  const status: any = err['status'] || err['statusCode'];
  return status ? parseInt(status, 10) : 500;
};

// 내부 서버 오류인지 확인하는 함수
const isInternalServerError = (err: Error) => {
  const status: number = getStatusFromResponse(err);
  return status >= 500;
};

const errorHandler = () => {
  const errorMiddleware = async (
    err: Error,
    req: Request,
    res: Response,
    next: Function
  ) => {
    const errName: string = err.name;
    const errMessage: string = err.message;
    const errStack: string = err.stack;
    const errArea: any = errorHelper.errorTracer(err);
    setRequestInfo(req);

    try {
      const result: any = await transport.sendLog({
        content: `name: ${`${errName}`}   \n  errmsg:${errMessage} \n stackmsg:${errStack} `,
        errArea: errArea,
        date: new Date(),
      });

      if (result && isInternalServerError(err)) {
        // Set error(event) id please
        res['eventId'] = result;
        next(err);
        return;
      }

      next(err);
    } catch (error) {
      next(error);
    }
  };

  return errorMiddleware;
};

export { errorHandler };
