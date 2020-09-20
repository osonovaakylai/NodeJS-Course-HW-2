import * as express from 'express';
import { Group, User } from '../loaders/database';

// find groups by given user
export const getGroupsByUserId = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    if (req.params.userId) {
      const groups = await Group.findAll({
        include: [
            User,
            { model: User, where: { id: req.params.userId } },
        ],
      });
      res.json({ success: true, message: 'Success', data: groups || [] });
    } else {
      res.status(500).json({ success: false, message: 'Id not provided!' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

// find users belonging to group
export const getUsersByGroupId = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    if (req.params.groupId) {
      const users = await User.findAll({
        include: [
          Group,
          { model: Group, where: { id: req.params.groupId } },
        ],
      });
      res.json({ success: true, message: 'Success', data: users || [] });
    } else {
      res.status(500).json({ success: false, message: 'Id not provided!' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};
