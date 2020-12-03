import * as tracer from './tracer';
import * as sdk from './sdk';

const init = sdk.init;
const recentErrorId = tracer.recentErrorId;
export { init, tracer, recentErrorId };
