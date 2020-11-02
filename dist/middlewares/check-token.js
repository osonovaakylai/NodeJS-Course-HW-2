"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        logger.info(constants_1.NO_TOKEN);
        return res
            .status(403)
            .send({ success: false, message: constants_1.NO_TOKEN });
    }
    jsonwebtoken_1.default.verify(token, index_1.default.secret, (err, decoded) => {
        if (err) {
            logger.info(constants_1.AUTHENTIFICATION_FAILED);
            return res
                .status(401)
                .send({ success: false, message: constants_1.AUTHENTIFICATION_FAILED });
        }
        logger.info(constants_1.SUCCESS_MESSAGE);
        req['decoded'] = decoded;
        next();
    });
};
exports.default = checkToken;
//# sourceMappingURL=check-token.js.map