"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodySchema = exports.validator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
exports.validator = express_joi_validation_1.createValidator();
exports.bodySchema = joi_1.default.object({
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$'))
        .required(),
    age: joi_1.default.number().integer().min(4).max(130).required(),
    isDeleted: joi_1.default.boolean().required()
});
//# sourceMappingURL=user-validator.js.map