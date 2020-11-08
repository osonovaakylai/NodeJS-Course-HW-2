import * as express from 'express';
import Logger from '../config/logger';
import { ERROR_MESSAGE } from '../util/constants';

const logger = new Logger('app');

const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response
) => {
  logger.error(ERROR_MESSAGE, { success: false });
  console.error(err.stack);
  res.status(500).json({ success: false, message: ERROR_MESSAGE });
};

export default errorHandler;
