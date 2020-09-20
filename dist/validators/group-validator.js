"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSchema = exports.validator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
exports.validator = express_joi_validation_1.createValidator();
exports.groupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    permissions: joi_1.default.array().items(joi_1.default.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"))
});
//# sourceMappingURL=group-validator.js.map