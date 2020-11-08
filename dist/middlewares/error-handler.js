"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../util/constants");
const logger = new logger_1.default('app');
const errorHandler = (err, req, res) => {
    logger.error(constants_1.ERROR_MESSAGE, { success: false });
    console.error(err.stack);
    res.status(500).json({ success: false, message: constants_1.ERROR_MESSAGE });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map