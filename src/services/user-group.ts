import * as express from 'express';
import User from '../models/user';
import Group from '../models/group';
import Logger from '../config/logger';
import {
  ID_NOT_PROVIDED,
  NOT_FOUND_MESSAGE,
  SUCCESS_MESSAGE,
} from '../util/constants';

const logger = new Logger('app');

// find groups by given user
export const getGroupsByUserId = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    if (req.params.userId) {
      const user = await User.findById(req.params.userId);
      if (user) {
        const groups = await Group.find({
          include: [User, { model: User, where: { id: req.params.userId } }],
        });
        if (groups) {
          res.json({ success: true, message: 'Success', data: groups || [] });
          logger.info(SUCCESS_MESSAGE);
        } else {
          res
            .status(404)
            .json({ success: true, message: 'Success', data: groups || [] });
          logger.info(SUCCESS_MESSAGE);
        }
        logger.info(SUCCESS_MESSAGE);
      } else {
        logger.info(NOT_FOUND_MESSAGE);
        res.status(404).json({
          success: false,
          message: NOT_FOUND_MESSAGE,
        });
      }
    } else {
      res.status(500).json({ success: false, message: ID_NOT_PROVIDED });
      logger.error(ID_NOT_PROVIDED, { success: false });
    }
  } catch (err) {
    return next(err);
  }
};

// find users belonging to group
export const getUsersByGroupId = async (
  req: express.Request,
  res: express.Response,
  next: any
): Promise<any> => {
  try {
    if (req.params.groupId) {
      const group = await Group.findById(req.params.groupId);
      if (group) {
        const users = await User.find({
          include: [Group, { model: Group, where: { id: req.params.groupId } }],
        });
        logger.info(SUCCESS_MESSAGE);
        res.json({ success: true, message: 'Success', data: users || [] });
      } else {
        logger.info(NOT_FOUND_MESSAGE);
        res.status(404).json({
          success: false,
          message: NOT_FOUND_MESSAGE,
        });
      }
    } else {
      res.status(500).json({ success: false, message: ID_NOT_PROVIDED });
      logger.error(ID_NOT_PROVIDED, { success: false });
    }
  } catch (err) {
    return next(err);
  }
};
