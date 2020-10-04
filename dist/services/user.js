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
const sequelize_1 = __importDefault(require("sequelize"));
const uuid_1 = require("uuid");
const sequelize_2 = require("sequelize");
const database_1 = require("../loaders/database");
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.User.findAll();
        res.json({ success: true, message: 'Success', data: users || [] });
        logger.info(constants_1.SUCCESS_MESSAGE);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsersByParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubstring, limit } = req.query;
    try {
        if (req.query && limit && loginSubstring) {
            const filteredUsers = yield database_1.User.findAll({
                where: {
                    login: {
                        [sequelize_2.Op.like]: sequelize_1.default.literal(`\'%${loginSubstring}%\'`)
                    }
                },
                limit: Number(limit)
            });
            res.json({
                success: true,
                message: 'Success',
                data: filteredUsers || []
            });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            res.status(400).json({ success: false, message: constants_1.BAD_REQUEST_MESSAGE });
            logger.info(constants_1.BAD_REQUEST_MESSAGE);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
        if (user) {
            res.json({
                success: true,
                message: 'Success',
                data: user
            });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            res.json({
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE
            });
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield database_1.User.findOne({ where: { login: req.body.login } });
        if (checkdata) {
            res.json({ message: constants_1.ALREADY_EXIST, data: checkdata });
            logger.info(constants_1.ALREADY_EXIST);
        }
        else {
            const newUUID = uuid_1.v4();
            const newUserData = Object.assign({ id: newUUID }, req.body);
            const newUser = yield database_1.User.create(newUserData, {
                fields: ['id', 'login', 'password', 'age', 'isDeleted']
            });
            if (newUser) {
                res.json({
                    success: true,
                    message: 'Success',
                    data: newUser
                });
                logger.info(constants_1.SUCCESS_MESSAGE);
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
        let response;
        if (user) {
            yield user.update(req.body);
            response = {
                success: true,
                message: 'Success',
                data: user
            };
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            response = {
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE
            };
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
        return res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.User.findOne({ where: { id: req.params.id } });
        let response;
        if (user) {
            const newUser = Object.assign(Object.assign({}, user), { isDeleted: true });
            yield user.update(newUser);
            response = {
                success: true,
                message: 'Success',
                data: user
            };
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            response = {
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE
            };
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
        return res.json(response);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=user.js.map