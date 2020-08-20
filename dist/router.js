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
class Router {
    constructor(server) {
        const router = express.Router();
        const users = new Map();
        users[uuid_1.v4()] = { login: 'anna', password: "anna1234", age: 22, isDeleted: false };
        users[uuid_1.v4()] = { login: 'olesya', password: "olesya234", age: 18, isDeleted: false };
        users[uuid_1.v4()] = { login: 'dmitriy', password: "dmitriy1234", age: 42, isDeleted: false };
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
                    const isExceedsLimit = counter === parseInt(limit);
                    if (isLoginContainsSubstring && !isExceedsLimit) {
                        accumulator[key] = users[key];
                        counter++;
                    }
                    return accumulator;
                }, {});
            }
            res.json({
                users: filteredObj
            });
        });
        //create new user
        router.post('/users', cors_1.default(), (req, res) => {
            try {
                let user = {};
                Object.assign(user, req.body);
                const newUUID = uuid_1.v4();
                users[newUUID] = user;
                res.json({
                    user: users[newUUID]
                });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //get user by id
        router.get('/users/:id', cors_1.default(), (req, res) => {
            if (!!users[req.params.id]) {
                res.json({
                    user: users[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such user" }));
            }
        });
        //update user
        router.put('/users/:id', cors_1.default(), (req, res) => {
            try {
                if (!!users[req.params.id]) {
                    let user = {};
                    Object.assign(user, req.body);
                    users[req.params.id] = user;
                    res.json({
                        user: users[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such user" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //delete user softly
        router.delete('/users/:id', cors_1.default(), (req, res) => {
            const userToDelete = users[req.params.id];
            if (!!userToDelete) {
                const user = Object.assign(Object.assign({}, userToDelete), { isDeleted: true });
                users[req.params.id] = user;
                res.json({
                    user: user
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such user" }));
            }
        });
        router.options('*', cors_1.default());
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map