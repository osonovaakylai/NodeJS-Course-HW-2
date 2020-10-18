"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_validator_1 = require("../validators/user-validator");
const user_1 = require("../services/user");
const router = express.Router();
router.get('/user', user_1.getAllUsers);
router.get('/user', user_1.getUsersByParams);
router.post('/user', user_validator_1.validator.body(user_validator_1.bodySchema), user_1.createUser);
router.get('/user/:id', user_1.getUserById);
router.put('/user/:id', user_validator_1.validator.body(user_validator_1.bodySchema), user_1.updateUser);
router.delete('/user/:id', user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user-router.js.map