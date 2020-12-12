import * as tracer from './tracer';
import * as sdk from './sdk';

const init = sdk.init;
const recentErrorId = tracer.recentErrorId;
const captureException = tracer.captureException;
const startErrorCapturing = tracer.startErrorCapturing;
export { init, startErrorCapturing, captureException, recentErrorId };
