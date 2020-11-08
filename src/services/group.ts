import * as express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IGroupRequestSchema } from '../interfaces/user';
import Group from '../models/group';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  ALREADY_EXIST,
} from '../util/constants';
import Logger from '../config/logger';

const logger = new Logger('app');

export const getAllGroups = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const groups = await Group.find();
    res.json({ success: true, message: 'Success', data: groups || [] });
    logger.info(SUCCESS_MESSAGE);
  } catch (err) {
    return next(err);
  }
};

export const getGroupById = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const group = await Group.findOne({ id: req.params.id });
    if (group) {
      res.json({
        success: true,
        message: 'Success',
        data: group,
      });
      logger.info(SUCCESS_MESSAGE);
    } else {
      res.json({
        success: false,
        message: NOT_FOUND_MESSAGE,
      });
      logger.info(NOT_FOUND_MESSAGE);
    }
  } catch (err) {
    return next(err);
  }
};

export const createGroup = async (
  req: ValidatedRequest<IGroupRequestSchema>,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const checkdata = await Group.findOne({ name: req.body.name });
    if (checkdata) {
      res.json({ message: 'Group already exist', data: checkdata });
      logger.info(ALREADY_EXIST);
    } else {
      const newGroup = await Group.create(req.body);
      if (newGroup) {
        res.json({
          success: true,
          message: 'Success',
          data: newGroup,
        });
        logger.info(SUCCESS_MESSAGE);
      }
    }
  } catch (err) {
    return next(err);
  }
};

export const updateGroup = async (
  req: ValidatedRequest<IGroupRequestSchema>,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    let response: any;
    if (group) {
      response = {
        success: true,
        message: 'Success',
        data: group,
      };
      logger.info(SUCCESS_MESSAGE);
    } else {
      response = {
        success: false,
        message: NOT_FOUND_MESSAGE,
      };
      logger.info(NOT_FOUND_MESSAGE);
    }
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

export const deleteGroup = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    let response: any;
    if (group) {
      response = {
        success: true,
        message: 'Success',
      };
      logger.info(SUCCESS_MESSAGE);
    } else {
      response = {
        success: false,
        message: NOT_FOUND_MESSAGE,
      };
      logger.info(NOT_FOUND_MESSAGE);
    }
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};
