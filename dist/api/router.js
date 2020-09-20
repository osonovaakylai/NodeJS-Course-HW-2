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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_validator_1 = require("../validators/user-validator");
const user_1 = require("../services/user");
const group_1 = require("../services/group");
const group_validator_1 = require("../validators/group-validator");
const user_group_1 = require("../services/user-group");
class Router {
    constructor(server) {
        const router = express.Router();
        router.get('/', user_1.getAllUsers);
        router.get('/users', cors_1.default(), user_1.getUsersByParams);
        router.post('/user/create', cors_1.default(), user_validator_1.validator.body(user_validator_1.bodySchema), user_1.createUser);
        router.get('/user/:id', cors_1.default(), user_1.getUserById);
        router.put('/user/:id', cors_1.default(), user_validator_1.validator.body(user_validator_1.bodySchema), user_1.updateUser);
        router.delete('/user/:id', cors_1.default(), user_1.deleteUser);
        router.get('/groups', cors_1.default(), group_1.getAllGroups);
        router.post('/group/create', cors_1.default(), user_validator_1.validator.body(group_validator_1.groupSchema), group_1.createGroup);
        router.get('/group/:id', cors_1.default(), group_1.getGroupById);
        router.put('/group/:id', cors_1.default(), user_validator_1.validator.body(group_validator_1.groupSchema), group_1.updateGroup);
        router.delete('/group/:id', cors_1.default(), group_1.deleteGroup);
        router.get('/groups/:userId/user', cors_1.default(), user_group_1.getGroupsByUserId);
        router.get('/users/:groupId/group', cors_1.default(), user_group_1.getUsersByGroupId);
        router.options('*', cors_1.default());
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map