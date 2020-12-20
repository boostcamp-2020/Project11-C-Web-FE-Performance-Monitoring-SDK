import * as sdk from './sdk';
import * as Handlers from './handlers';

const init = sdk.init;
const errorHandler = Handlers.errorHandler;
const startErrorCapturing = Handlers.startErrorCapturing;
const catchUnhandledRejection = Handlers.catchUnhandledRejection;
const captureException = Handlers.captureException;
export {
  init,
  errorHandler,
  startErrorCapturing,
  catchUnhandledRejection,
  captureException,
};
