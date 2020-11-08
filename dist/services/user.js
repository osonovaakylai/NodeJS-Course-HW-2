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
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json({ success: true, message: 'Success', data: users || [] });
        logger.info(constants_1.SUCCESS_MESSAGE);
    }
    catch (err) {
        logger.info('HERE', err);
        return next(err);
    }
});
exports.getUsersByParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubstring, limit } = req.query;
    try {
        if (req.query && limit && loginSubstring) {
            const filteredUsers = yield user_1.default.find({
                login: { $regex: loginSubstring }
            }).limit(Number(limit));
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
        return next(err);
    }
});
exports.getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
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
        return next(err);
    }
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield user_1.default.findOne({ login: req.body.login });
        if (checkdata) {
            res.json({ message: constants_1.ALREADY_EXIST, data: checkdata });
            logger.info(constants_1.ALREADY_EXIST);
        }
        else {
            const newUser = yield user_1.default.create(req.body);
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
        return next(err);
    }
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let response;
        if (user) {
            // await user.update(req.body);
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
        return next(err);
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        let response;
        if (user) {
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
        return next(err);
    }
});
//# sourceMappingURL=user.js.map