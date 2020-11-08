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
exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroupById = exports.getAllGroups = void 0;
const group_1 = __importDefault(require("../models/group"));
const constants_1 = require("../util/constants");
const logger_1 = __importDefault(require("../config/logger"));
const logger = new logger_1.default('app');
exports.getAllGroups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield group_1.default.find();
        res.json({ success: true, message: 'Success', data: groups || [] });
        logger.info(constants_1.SUCCESS_MESSAGE);
    }
    catch (err) {
        return next(err);
    }
});
exports.getGroupById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield group_1.default.findOne({ id: req.params.id });
        if (group) {
            res.json({
                success: true,
                message: 'Success',
                data: group,
            });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            res.json({
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE,
            });
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.createGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield group_1.default.findOne({ name: req.body.name });
        if (checkdata) {
            res.json({ message: 'Group already exist', data: checkdata });
            logger.info(constants_1.ALREADY_EXIST);
        }
        else {
            const newGroup = yield group_1.default.create(req.body);
            if (newGroup) {
                res.json({
                    success: true,
                    message: 'Success',
                    data: newGroup,
                });
                logger.info(constants_1.SUCCESS_MESSAGE);
            }
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.updateGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield group_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        let response;
        if (group) {
            response = {
                success: true,
                message: 'Success',
                data: group,
            };
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            response = {
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE,
            };
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
        return res.json(response);
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield group_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        let response;
        if (group) {
            response = {
                success: true,
                message: 'Success',
            };
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            response = {
                success: false,
                message: constants_1.NOT_FOUND_MESSAGE,
            };
            logger.info(constants_1.NOT_FOUND_MESSAGE);
        }
        return res.json(response);
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=group.js.map