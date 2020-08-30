import Sequelize from "sequelize";
import { v4 as uuid } from "uuid";
const Op = Sequelize.Op;
import * as express from "express";
import { IUser, IUserRequestSchema } from "../types/user";
import { ValidatedRequest } from "express-joi-validation";
import User from "../models/user";

const users = new Map<string, IUser>();
users[uuid()] = {
  login: "anna",
  password: "anna1234",
  age: 22,
  isDeleted: false,
};
users[uuid()] = {
  login: "olesya",
  password: "olesya234",
  age: 18,
  isDeleted: false,
};
users[uuid()] = {
  login: "dmitriy",
  password: "dmitriy1234",
  age: 42,
  isDeleted: false,
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let getdata = await User.findAll();
    res.json({
      success: true,
      message: "Success",
      data: getdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const getUsers = async (req: express.Request, res: express.Response) => {
  const { loginSubstring, limit } = req.query;
  let filteredObj = {};
  let counter = 0;
  if (req.query && limit && loginSubstring) {
    filteredObj = Object.keys(users).reduce((accumulator, key) => {
      const isLoginContainsSubstring = users[key].login.includes(
        loginSubstring
      );
      const isExceedsLimit = counter === Number(limit);
      if (isLoginContainsSubstring && !isExceedsLimit) {
        accumulator[key] = users[key];
        counter++;
      }
      return accumulator;
    }, {});
    res.json({
      users: filteredObj,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};

export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let user = await User.findOne({ where: { id: `${req.params.id}` } });
    if (user) {
      res.json({
        success: true,
        message: "Success",
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "No such user",
    });
  }
};

export const createUser = async (
  req: ValidatedRequest<IUserRequestSchema>,
  res: express.Response
) => {
  try {
    const checkdata = await User.findOne({ where: { login: req.body.login } });
    console.log(checkdata);
    if (checkdata) {
      res.json({
        message: "User already exist",
        data: checkdata,
      });
    } else {
      const newUUID = uuid();
      const newUser = { id: newUUID, ...req.body };
      console.log(newUser);
      const createdata = await User.create(newUser, {
        fields: ["id", "login", "password", "age", "isDeleted"],
      });
      if (createdata) {
        res.json({
          success: true,
          message: "Success",
          data: createdata,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const updateUser = async (
  req: ValidatedRequest<IUserRequestSchema>,
  res: express.Response
) => {
  try {
    let finddata = await User.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (finddata.length > 0) {
      finddata.forEach(async (data) => {
        await data.update(req.body);
      });
    } else {
      return res.json({
        success: false,
        message: "No such user",
      });
    }
    return res.json({
      success: true,
      message: "Success",
      data: finddata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let deletedata = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedata) {
      res.json({
        success: true,
        message: "Success",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
