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
exports.getUsersByGroupId = exports.getGroupsByUserId = void 0;
const user_1 = __importDefault(require("../models/user"));
const group_1 = __importDefault(require("../models/group"));
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
// find groups by given user
exports.getGroupsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.userId) {
            const groups = yield group_1.default.find({
                include: [
                    user_1.default,
                    { model: user_1.default, where: { id: req.params.userId } },
                ],
            });
            res.json({ success: true, message: 'Success', data: groups || [] });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            res.status(500).json({ success: false, message: constants_1.ID_NOT_PROVIDED });
            logger.error(constants_1.ID_NOT_PROVIDED, { success: false });
        }
    }
    catch (err) {
        return next(err);
    }
});
// find users belonging to group
exports.getUsersByGroupId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.groupId) {
            const users = yield user_1.default.find({
                include: [
                    group_1.default,
                    { model: group_1.default, where: { id: req.params.groupId } },
                ],
            });
            res.json({ success: true, message: 'Success', data: users || [] });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            res.status(500).json({ success: false, message: constants_1.ID_NOT_PROVIDED });
            logger.error(constants_1.ID_NOT_PROVIDED, { success: false });
        }
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user-group.js.map