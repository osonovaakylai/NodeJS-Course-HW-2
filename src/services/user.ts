import Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import * as express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IUserRequestSchema } from '../interfaces/user';
import { User } from '../loaders/database';
import Logger from '../config/logger'
import { BAD_REQUEST_MESSAGE, SUCCESS_MESSAGE, ALREADY_EXIST, NOT_FOUND_MESSAGE } from '../util/constants';

const logger = new Logger('app')

export const getAllUsers = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
  try {
    const users = await User.findAll();
    res.json({ success: true, message: 'Success', data: users || [] });
    logger.info(SUCCESS_MESSAGE)
  } catch (err) {
    return next(err)
  }
};

export const getUsersByParams = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
  const { loginSubstring, limit } = req.query;
  try {
    if (req.query && limit && loginSubstring) {
      const filteredUsers = await User.findAll({
        where: {
          login: {
            [Op.like]: Sequelize.literal(`\'%${loginSubstring}%\'`)
          }
        },
        limit: Number(limit)
      });
      res.json({
        success: true,
        message: 'Success',
        data: filteredUsers || []
      });
      logger.info(SUCCESS_MESSAGE)
    } else {
      res.status(400).json({ success: false, message: BAD_REQUEST_MESSAGE });
      logger.info(BAD_REQUEST_MESSAGE)
    }
  } catch (err) {
    return next(err)
  }
};

export const getUserById = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.json({
        success: true,
        message: 'Success',
        data: user
      });
      logger.info(SUCCESS_MESSAGE)
    } else {
      res.json({
        success: false,
        message: NOT_FOUND_MESSAGE
      });
      logger.info(NOT_FOUND_MESSAGE)
    }
  } catch (err) {
    return next(err)
  }
};

export const createUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response, next: any): Promise<any> => {
  try {
    const checkdata = await User.findOne({ where: { login: req.body.login } });
    if (checkdata) {
      res.json({ message: ALREADY_EXIST, data: checkdata });
      logger.info(ALREADY_EXIST)
    } else {
      const newUUID = uuid();
      const newUserData = { id: newUUID, ...req.body };
      const newUser = await User.create(newUserData, {
        fields: ['id', 'login', 'password', 'age', 'isDeleted']
      });
      if (newUser) {
        res.json({
          success: true,
          message: 'Success',
          data: newUser
        });
        logger.info(SUCCESS_MESSAGE)
      }
    }
  } catch (err) {
    return next(err)
  }
};

export const updateUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response, next: any): Promise<any> => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    let response: any;
    if (user) {
      await user.update(req.body);
      response = {
        success: true,
        message: 'Success',
        data: user
      };
      logger.info(SUCCESS_MESSAGE)
    } else {
      response = {
        success: false,
        message: NOT_FOUND_MESSAGE
      };
      logger.info(NOT_FOUND_MESSAGE)
    }
    return res.json(response);
  } catch (err) {
    return next(err)
  }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    let response: any;
    if (user) {
      const newUser = { ...user, isDeleted: true }
      await user.update(newUser);
      response = {
        success: true,
        message: 'Success',
        data: user
      };
      logger.info(SUCCESS_MESSAGE)
    } else {
      response = {
        success: false,
        message: NOT_FOUND_MESSAGE
      };
      logger.info(NOT_FOUND_MESSAGE)
    }
    return res.json(response);
  } catch (err) {
    return next(err)
  }
};
