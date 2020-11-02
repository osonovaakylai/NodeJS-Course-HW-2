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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import Promise from 'bluebird'
const Sequelize = require('sequelize');
const index_1 = __importDefault(require("../../config/index"));
const database = __importStar(require("../../loaders/database"));
const { User, Group, UserGroup, sequelize } = database;
// const projects = [{ name: 'Travaria' }, { name: 'Webster' }];
// const users = [
//   { name: 'NL/AB', password: '123', role: 'normal' },
//   { name: 'TL/TD', password: '123', role: 'normal' },
// ];
const _generateProjects = () => {
    // return Promise.map(projects, async (project) => {
    //   return Project.findOrCreate({ where: { name: project.name } }).get(0);
    // });
};
const _generateUsers = () => {
    // return Promise.map(users, async (user) => {
    //   return User.findOrCreate({
    //     where: {
    //       name: user.name,
    //       password: user.password,
    //       role: user.role,
    //     },
    //   }).get(0);
    // });
};
const _getOneRandomProject = () => __awaiter(void 0, void 0, void 0, function* () {
    // await _generateProjects();
    // return Project.findOne({ order: [Sequelize.fn('RAND')] });
});
const _getOneRandomUser = () => __awaiter(void 0, void 0, void 0, function* () {
    // await _generateUsers();
    // return User.findOne({ order: [Sequelize.fn('RAND')] });
});
const testHelper = {
    cleanDatabase: () => Promise.all(Object.keys(database).map((key) => {
        if (['sequelize', 'Sequelize'].includes(key))
            return null;
        return database[key].destroy({ where: {}, force: true });
    })),
    generateProjects: () => _generateProjects(),
    getOneRandomProject: () => _getOneRandomProject(),
    getOneRandomUser: () => _getOneRandomUser(),
    generateUsers: () => _generateUsers(),
    withLogin: (req, body = { login: 'user1', password: 'user1Pass' }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.findOne({ login: body.login });
        const authToken = jsonwebtoken_1.default.sign({ id: user.id }, index_1.default.secret);
        return req.set('x-access-token', `${authToken}`);
    }),
};
exports.default = testHelper;
//# sourceMappingURL=utils.js.map