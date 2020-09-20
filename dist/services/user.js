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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsersByParams = exports.getAllUsers = void 0;
<<<<<<< HEAD
const sequelize_1 = __importDefault(require("sequelize"));
const uuid_1 = require("uuid");
const sequelize_2 = require("sequelize");
const database_1 = require("../loaders/database");
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.User.findAll();
=======
const user_1 = __importDefault(require("../models/user"));
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
        res.json({ success: true, message: 'Success', data: users || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.getUsersByParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubstring, limit } = req.query;
    try {
        if (req.query && limit && loginSubstring) {
<<<<<<< HEAD
            const filteredUsers = yield database_1.User.findAll({
                where: {
                    login: {
                        [sequelize_2.Op.like]: sequelize_1.default.literal(`\'%${loginSubstring}%\'`)
                    }
                },
                limit: Number(limit)
            });
=======
            const filteredUsers = yield user_1.default.find({
                login: { $regex: loginSubstring }
            }).limit(Number(limit));
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
            res.json({
                success: true,
                message: 'Success',
                data: filteredUsers || []
            });
        }
        else {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'No such user' });
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
=======
        const user = yield user_1.default.findById(req.params.id);
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
        res.json({
            success: true,
            message: 'Success',
            data: user || null
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const checkdata = yield database_1.User.findOne({ where: { login: req.body.login } });
=======
        const checkdata = yield user_1.default.findOne({ login: req.body.login });
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
        if (checkdata) {
            res.json({ message: 'User already exist', data: checkdata });
        }
        else {
<<<<<<< HEAD
            const newUUID = uuid_1.v4();
            const newUserData = Object.assign({ id: newUUID }, req.body);
            const newUser = yield database_1.User.create(newUserData, {
                fields: ['id', 'login', 'password', 'age', 'isDeleted']
            });
=======
            const newUser = yield user_1.default.create(req.body);
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
            if (newUser) {
                res.json({
                    success: true,
                    message: 'Success',
                    data: newUser
                });
            }
        }
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
=======
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
        let response;
        if (user) {
            response = {
                success: true,
                message: 'Success',
                data: user
            };
        }
        else {
            response = {
                success: false,
                message: 'No such user'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
=======
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
        let response;
        if (user) {
            response = {
                success: true,
                message: 'Success',
                data: user
            };
        }
        else {
            response = {
                success: false,
                message: 'No such user'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
//# sourceMappingURL=user.js.map