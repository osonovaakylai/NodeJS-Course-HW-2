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
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const Joi = __importStar(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
class Router {
    constructor(server) {
        const router = express.Router();
        const validator = express_joi_validation_1.createValidator();
        const bodySchema = Joi.object({
            login: Joi.string().required(),
            password: Joi.string()
                .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$'))
                .required(),
            age: Joi.number().integer().min(4).max(130).required(),
            isDeleted: Joi.boolean().required()
        });
        const users = new Map();
        users[uuid_1.v4()] = {
            login: 'anna',
            password: 'anna1234',
            age: 22,
            isDeleted: false
        };
        users[uuid_1.v4()] = {
            login: 'olesya',
            password: 'olesya234',
            age: 18,
            isDeleted: false
        };
        users[uuid_1.v4()] = {
            login: 'dmitriy',
            password: 'dmitriy1234',
            age: 42,
            isDeleted: false
        };
        router.get('/', (req, res) => {
            res.json({
                message: 'API works'
            });
        });
        router.get('/users', cors_1.default(), (req, res) => {
            const { loginSubstring, limit } = req.query;
            let filteredObj = {};
            let counter = 0;
            if (req.query && limit && loginSubstring) {
                filteredObj = Object.keys(users).reduce((accumulator, key) => {
                    const isLoginContainsSubstring = users[key].login.includes(loginSubstring);
                    const isExceedsLimit = counter === Number(limit);
                    if (isLoginContainsSubstring && !isExceedsLimit) {
                        accumulator[key] = users[key];
                        counter++;
                    }
                    return accumulator;
                }, {});
                res.json({
                    users: filteredObj
                });
            }
            else {
                res.status(400).send(JSON.stringify({ error: 'Bad request' }));
            }
        });
        router.get('/users/:id', cors_1.default(), (req, res) => {
            if (!!users[req.params.id]) {
                res.json({
                    user: users[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: 'no such user' }));
            }
        });
        router.post('/users', cors_1.default(), validator.body(bodySchema), (req, res) => {
            try {
                const user = {};
                Object.assign(user, req.body);
                const newUUID = uuid_1.v4();
                users[newUUID] = user;
                res.json({
                    user: users[newUUID]
                });
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: 'problem with posted data' }));
            }
        });
        router.put('/users/:id', cors_1.default(), validator.body(bodySchema), (req, res) => {
            try {
                if (!!users[req.params.id]) {
                    const user = {};
                    Object.assign(user, req.body);
                    users[req.params.id] = user;
                    res.json({
                        user: users[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ error: 'no such user' }));
                }
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: 'problem with posted data' }));
            }
        });
        router.delete('/users/:id', cors_1.default(), (req, res) => {
            const userToDelete = users[req.params.id];
            if (!!userToDelete) {
                const user = Object.assign(Object.assign({}, userToDelete), { isDeleted: true });
                users[req.params.id] = user;
                res.json({ user });
            }
            else {
                res.status(404).send(JSON.stringify({ error: 'no such user' }));
            }
        });
        router.options('*', cors_1.default());
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map