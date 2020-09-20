import { v4 as uuid } from 'uuid';
import * as express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IGroupRequestSchema } from '../interfaces/user';
import { Group } from '../loaders/database';

export const getAllGroups = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const groups = await Group.findAll();
    res.json({ success: true, message: 'Success', data: groups || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

export const getGroupById = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const group = await Group.findOne({ where: { id: req.params.id } });
    res.json({
      success: true,
      message: 'Success',
      data: group || null
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Something went wrong!' });
  }
};

export const createGroup = async (req: ValidatedRequest<IGroupRequestSchema>, res: express.Response): Promise<any> => {
  try {
    const checkdata = await Group.findOne({ where: { name: req.body.name } });
    if (checkdata) {
      res.json({ message: 'Group already exist', data: checkdata });
    } else {
      const newUUID = uuid();
      const newGroupData = {
        id: newUUID,
        name: req.body.name,
        permissions: req.body.permissions.join(','),
      };
      const newGroup = await Group.create(newGroupData, {
        fields: ['id', 'name', 'permissions']
      });
      if (newGroup) {
        res.json({
          success: true,
          message: 'Success',
          data: newGroup
        });
      }
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: 'Something went wrong!' });
  }
};

export const updateGroup = async (req: ValidatedRequest<IGroupRequestSchema>, res: express.Response): Promise<any> => {
  try {
    const group = await Group.findOne({ where: { id: req.params.id } });
    let response: any;
    if (group) {
      await group.update(req.body);
      response = {
        success: true,
        message: 'Success',
        data: group
      };
    } else {
      response = {
        success: false,
        message: 'No such group'
      };
    }
    return res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

export const deleteGroup = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const deletedRowCount = await Group.destroy({ where: { id: req.params.id } });
    let response: any;
    if (deletedRowCount === 1) {
      response = {
        success: true,
        message: 'Success'
      };
    } else {
      response = {
        success: false,
        message: 'No such group'
      };
    }
    return res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};
