"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = exports.getAllUsers = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const uuid_1 = require("uuid");
const sequelize_2 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const users = new Map();
users[uuid_1.v4()] = {
    login: "anna",
    password: "anna1234",
    age: 22,
    isDeleted: false,
};
users[uuid_1.v4()] = {
    login: "olesya",
    password: "olesya234",
    age: 18,
    isDeleted: false,
};
users[uuid_1.v4()] = {
    login: "dmitriy",
    password: "dmitriy1234",
    age: 42,
    isDeleted: false,
};
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getdata = yield user_1.default.findAll();
        res.json({
            success: true,
            message: "Success",
            data: getdata,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubstring, limit } = req.query;
    // let filteredObj = {};
    // let counter = 0;
    // if (req.query && limit && loginSubstring) {
    //   filteredObj = Object.keys(users).reduce((accumulator, key) => {
    //     const isLoginContainsSubstring = users[key].login.includes(
    //       loginSubstring
    //     );
    //     const isExceedsLimit = counter === Number(limit);
    //     if (isLoginContainsSubstring && !isExceedsLimit) {
    //       accumulator[key] = users[key];
    //       counter++;
    //     }
    //     return accumulator;
    //   }, {});
    //   res.json({
    //     users: filteredObj,
    //   });
    // } else {
    //   res.status(400).json({
    //     success: false,
    //     message: "Bad request",
    //   });
    // }
    try {
        if (req.query && limit && loginSubstring) {
            let filteredUsers = yield user_1.default.findAll({
                where: {
                    login: {
                        [sequelize_2.Op.like]: sequelize_1.default.literal(`\'%${loginSubstring}%\'`),
                    },
                },
                limit: Number(limit)
            });
            res.json({
                success: true,
                message: "Success",
                data: filteredUsers || [],
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Bad request",
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: "No such user",
        });
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.findOne({ where: { id: `${req.params.id}` } });
        res.json({
            success: true,
            message: "Success",
            data: user || null,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield user_1.default.findOne({ where: { login: req.body.login } });
        console.log(checkdata);
        if (checkdata) {
            res.json({
                message: "User already exist",
                data: checkdata,
            });
        }
        else {
            const newUUID = uuid_1.v4();
            const newUser = Object.assign({ id: newUUID }, req.body);
            const createdata = yield user_1.default.create(newUser, {
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
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.findOne({ where: { id: `${req.params.id}` } });
        let response;
        if (user) {
            yield user.update(req.body);
            response = {
                success: true,
                message: "Success",
                data: user,
            };
        }
        else {
            response = {
                success: false,
                message: "No such user",
            };
        }
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deletedata = yield user_1.default.destroy({
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});
//# sourceMappingURL=user.controller.js.map