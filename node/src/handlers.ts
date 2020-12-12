import { transport, errorHelper, pocket } from '@acent/core';
import * as os from 'os';
import { reqInfoType, tagType, errorArea, Reason } from './interface';

const getOs = () => {
  try {
    const osVersion = os.version();

    return osVersion;
  } catch (error) {
    return os.type();
  }
};

const getTags = () => {
  const tags: tagType = {
    type: os.type(),
    arch: os.arch(),
    platform: os.platform(),
    hostName: os.hostname(),
    osVersion: getOs(),
    runtimeName: process.release.name,
    runtimeVersion: process.version,
  };
  pocket.putInfo(tags);

  return tags;
};

const getRequestInfo = (req: Request) => {
  const requestInfo: reqInfoType = {
    browser: req.headers['user-agent'],
    language: req.headers['accept-language'],
    method: req.method,
    url: req.url,
    body: String(req.body),
    type: os.type(),
    arch: os.arch(),
    platform: os.platform(),
    hostName: os.hostname(),
    osVersion: getOs(),
    runtimeName: process.release.name,
    runtimeVersion: process.version,
  };

  pocket.putInfo(requestInfo);
  return requestInfo;
};

const getStatusFromResponse = (err: Error) => {
  const status: string = err['status'] || err['statusCode'];
  return status ? parseInt(status, 10) : 500;
};

const isInternalServerError = (err: Error) => {
  const status: number = getStatusFromResponse(err);
  return status >= 500;
};

const startErrorCapturing = () => {
  process.on('uncaughtException', async (err: Error, _origin) => {
    console.log(err);
    const errArea: errorArea = errorHelper.errorTracer(err.stack);
    const tags: tagType = getTags();

    try {
      const result: string | boolean = await transport.sendLog({
        name: err.name,
        message: err.message,
        stack: err.stack,
        errArea: errArea,
        tags: tags,
        date: new Date().getTime(), // timestamp도? 정렬할 때...
      });

      console.log('Error ID : ', result);
    } catch (error) {
      console.log(error);
      return;
    }
  });
};

const captureException = async (err: Error, req: Request, res: Response) => {
  const errName: string = err.name;
  const errMessage: string = err.message;
  const errStack: string = err.stack;
  const errArea: errorArea = errorHelper.errorTracer(err.stack);
  const tags: reqInfoType | tagType = req ? getRequestInfo(req) : getTags();

  try {
    const result: string | boolean = await transport.sendLog({
      name: errName,
      message: errMessage,
      stack: errStack,
      errArea: errArea,
      tags: tags,
      date: new Date().getTime(), // timestamp도? 정렬할 때...
    });

    if (result && isInternalServerError(err)) {
      res['eventId'] = result;
      return;
    }
  } catch (error) {
    throw error;
  }
};

const catchUnhandledRejection = () => {
  process.on('unhandledRejection', async (reason: Reason, promise) => {
    console.log(reason);
    const errArea: errorArea = errorHelper.errorTracer(reason.stack);
    const tags: tagType = getTags();

    try {
      const result: string | boolean = await transport.sendLog({
        name: reason.name,
        message: reason.message,
        stack: reason.stack,
        errArea: errArea,
        tags: tags,
        date: new Date().getTime(),
      });

      console.log('Error ID : ', result);
    } catch (error) {
      throw error;
    }
  });
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
    const errArea: errorArea = errorHelper.errorTracer(err.stack);
    const tags: reqInfoType = getRequestInfo(req);

    try {
      const result: string | boolean = await transport.sendLog({
        name: errName,
        message: errMessage,
        stack: errStack,
        errArea: errArea,
        tags: tags,
        date: new Date().getTime(), // timestamp도? 정렬할 때...
      });

      if (result && isInternalServerError(err)) {
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

export {
  errorHandler,
  startErrorCapturing,
  catchUnhandledRejection,
  captureException,
};
