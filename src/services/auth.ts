import * as express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../loaders/database';
import Logger from '../config/logger';
import config from '../config/index';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  BAD_REQUEST_MESSAGE,
} from '../util/constants';
const logger = new Logger('app');

// check API
export const checkAPI = async (
    req: express.Request,
    res: express.Response,
    next: any
  ): Promise<any> => {
    try {
      logger.info(SUCCESS_MESSAGE);
      res.status(200).send('API works');
    } catch (err) {
      return next(err);
    }
  };

// login
export const login = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const user = await User.findOne({ login: req.body.username });
    if (user) {
      if (req.body.password !== user.password) {
        logger.error(BAD_REQUEST_MESSAGE, { success: false });
        return res.status(401).send({ auth: false, token: null });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
      logger.info(SUCCESS_MESSAGE);
    } else {
      logger.error(NOT_FOUND_MESSAGE, { success: false });
      return res.status(404).send(NOT_FOUND_MESSAGE);
    }
  } catch (err) {
    return next(err);
  }
};

// logout
export const logout = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    logger.info(SUCCESS_MESSAGE);
    res.status(200).send({ auth: false, token: null });
  } catch (err) {
    return next(err);
  }
};
