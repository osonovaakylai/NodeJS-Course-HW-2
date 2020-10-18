import jwt from 'jsonwebtoken';
import * as express from 'express';
import config from '../config/index';
import Logger from '../config/logger';
import { AUTHENTIFICATION_FAILED, NO_TOKEN, SUCCESS_MESSAGE } from '../util/constants';

const logger = new Logger('app');

const checkToken = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    logger.info(NO_TOKEN);
    return res
      .status(403)
      .send({ success: false, message: NO_TOKEN });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      logger.info(AUTHENTIFICATION_FAILED);
      return res
        .status(401)
        .send({ success: false, message: AUTHENTIFICATION_FAILED });
    }

    logger.info(SUCCESS_MESSAGE);
    req['decoded'] = decoded;
    next();
  });
};

export default checkToken;
