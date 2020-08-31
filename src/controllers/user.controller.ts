import Sequelize from "sequelize";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import * as express from "express";
import { ValidatedRequest } from "express-joi-validation";
import { IUserRequestSchema } from "../types/user";
import User from "../models/user";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, message: "Success", data: users || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const getUsersByParams = async (req: express.Request, res: express.Response) => {
  const { loginSubstring, limit } = req.query;
  try {
    if (req.query && limit && loginSubstring) {
      const filteredUsers = await User.findAll({
        where: {
          login: {
            [Op.like]: Sequelize.literal(`\'%${loginSubstring}%\'`),
          },
        },
        limit: Number(limit),
      });
      res.json({
        success: true,
        message: "Success",
        data: filteredUsers || [],
      });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "No such user" });
  }
};

export const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({ where: { id: `${req.params.id}` } });
    res.json({
      success: true,
      message: "Success",
      data: user || null,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Something went wrong!" });
  }
};

export const createUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response) => {
  try {
    const checkdata = await User.findOne({ where: { login: req.body.login } });
    if (checkdata) {
      res.json({ message: "User already exist", data: checkdata });
    } else {
      const newUUID = uuid();
      const newUserData = { id: newUUID, ...req.body };
      const newUser = await User.create(newUserData, {
        fields: ["id", "login", "password", "age", "isDeleted"],
      });
      if (newUser) {
        res.json({
          success: true,
          message: "Success",
          data: newUser,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

export const updateUser = async (req: ValidatedRequest<IUserRequestSchema>, res: express.Response) => {
  try {
    const user = await User.findOne({ where: { id: `${req.params.id}` } });
    let response: any;
    if (user) {
      await user.update(req.body);
      response = {
        success: true,
        message: "Success",
        data: user,
      };
    } else {
      response = {
        success: false,
        message: "No such user",
      };
    }
    return res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } });
    if (deletedUser) {
      res.json({ success: true, message: "Success" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
