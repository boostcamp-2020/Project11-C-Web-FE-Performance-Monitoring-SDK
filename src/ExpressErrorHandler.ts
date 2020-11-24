import sendLog from './HttpTransport';

const ErrorCaptureHandler = async (err: Error, req, res, next) => {
  // console.log(err);

  const stackmsg = err.stack;
  const errname = err.name;
  const errmsg = err.message;

  // console.log(errname, errmsg, stackmsg);
  const result = await sendLog({
    content: `name: ${`${errname}333`}   \n  errmsg:${errmsg} \n stackmsg:${stackmsg} `,
    date: new Date(),
    env: process.env,
  });

  res
    .status(500)
    .send(`name: ${errname}   \n  errmsg:${errmsg} \n stackmsg:${stackmsg} `);
};

export default { ErrorCaptureHandler };
