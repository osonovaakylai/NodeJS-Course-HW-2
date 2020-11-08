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
const user_validator_1 = require("../validators/user-validator");
const user_1 = require("../services/user");
const auth_1 = require("../services/auth");
// import { createGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } from '../services/group';
// import { groupSchema } from '../validators/group-validator';
// import { getGroupsByUserId, getUsersByGroupId } from '../services/user-group';
const error_handler_1 = __importDefault(require("../middlewares/error-handler"));
const check_token_1 = __importDefault(require("../middlewares/check-token"));
class Router {
    constructor(server) {
        const router = express.Router();
        router.post('/', auth_1.checkAPI);
        router.post('/login', auth_1.login);
        router.get('/logout', auth_1.logout);
        router.get('/users', check_token_1.default, user_1.getAllUsers);
        router.get('/user', check_token_1.default, user_1.getUsersByParams);
        router.post('/user', check_token_1.default, user_validator_1.validator.body(user_validator_1.bodySchema), user_1.createUser);
        router.get('/user/:id', check_token_1.default, user_1.getUserById);
        router.put('/user/:id', check_token_1.default, user_validator_1.validator.body(user_validator_1.bodySchema), user_1.updateUser);
        router.delete('/user/:id', check_token_1.default, user_1.deleteUser);
        // router.get('/group', checkToken, getAllGroups);
        // router.post('/group', checkToken, validator.body(groupSchema), createGroup);
        // router.get('/group/:id', checkToken, getGroupById);
        // router.put('/group/:id', checkToken, validator.body(groupSchema), updateGroup);
        // router.delete('/group/:id', checkToken, deleteGroup);
        // router.get('/groups/:userId/user', checkToken, getGroupsByUserId);
        // router.get('/users/:groupId/group', checkToken, getUsersByGroupId);
        server.use('/', router);
        server.use(error_handler_1.default);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map