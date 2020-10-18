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
exports.logout = exports.login = exports.checkAPI = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../loaders/database");
const logger_1 = __importDefault(require("../config/logger"));
const index_1 = __importDefault(require("../config/index"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
// check API
exports.checkAPI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(constants_1.SUCCESS_MESSAGE);
        res.status(200).send('API works');
    }
    catch (err) {
        return next(err);
    }
});
// login
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.User.findOne({ login: req.body.username });
        if (user) {
            if (req.body.password !== user.password) {
                logger.error(constants_1.BAD_REQUEST_MESSAGE, { success: false });
                return res.status(401).send({ auth: false, token: null });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, index_1.default.secret, {
                expiresIn: 86400,
            });
            res.status(200).send({ auth: true, token: token });
            logger.info(constants_1.SUCCESS_MESSAGE);
        }
        else {
            logger.error(constants_1.NOT_FOUND_MESSAGE, { success: false });
            return res.status(404).send(constants_1.NOT_FOUND_MESSAGE);
        }
    }
    catch (err) {
        return next(err);
    }
});
// logout
exports.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(constants_1.SUCCESS_MESSAGE);
        res.status(200).send({ auth: false, token: null });
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=auth.js.map