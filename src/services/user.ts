import * as express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IUserRequestSchema } from '../interfaces/user';
import User from '../models/user';

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const users = await User.find();
    res.json({ success: true, message: 'Success', data: users || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

export const getUsersByParams = async (req: express.Request, res: express.Response): Promise<any> => {
  const { loginSubstring, limit } = req.query;
  try {
    if (req.query && limit && loginSubstring) {
      const filteredUsers = await User.find({
        login: {$regex: loginSubstring}
      }).limit(Number(limit))
      res.json({
        success: true,
        message: 'Success',
        data: filteredUsers || []
      });
    } else {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: 'No such user' });
  }
};

export const getUserById = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      success: true,
      message: 'Success',
      data: user || null
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Something went wrong!' });
  }
};

export const createUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response): Promise<any> => {
  try {
    const checkdata = await User.findOne({login: req.body.login});
    if (checkdata) {
      res.json({ message: 'User already exist', data: checkdata });
    } else {
      const newUser = await User.create(req.body);
      if (newUser) {
        res.json({
          success: true,
          message: 'Success',
          data: newUser
        });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: 'Something went wrong!' });
  }
};

export const updateUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response): Promise<any> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    let response: any;
    if (user) {
      response = {
        success: true,
        message: 'Success',
        data: user
      };
    } else {
      response = {
        success: false,
        message: 'No such user'
      };
    }
    return res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};

export const deleteUser = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {isDeleted: true}, {new: true});
    let response: any;
    if (user) {
      response = {
        success: true,
        message: 'Success',
        data: user
      };
    } else {
      response = {
        success: false,
        message: 'No such user'
      };
    }
    return res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
};
