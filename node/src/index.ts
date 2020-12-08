import * as sdk from './sdk';
import * as Handlers from './handlers';

const init = sdk.init;
const errorHandler = Handlers.errorHandler;
const startErrorCapturing = Handlers.startErrorCapturing;
export { init, errorHandler, startErrorCapturing };
