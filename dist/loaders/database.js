"use strict";
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
exports.UserGroup = exports.Group = exports.User = exports.sequelize = void 0;
const Sequelize = require('sequelize');
const index_1 = __importDefault(require("../config/index"));
const group_1 = require("../mockData/group");
const user_1 = require("../mockData/user");
const UserModel = require('../models/user');
const GroupModel = require('../models/group');
// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new Sequelize(index_1.default.databaseURL);
exports.sequelize = sequelize;
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
const UserGroup = sequelize.define('user_group', {});
exports.UserGroup = UserGroup;
const User = UserModel(sequelize, Sequelize);
exports.User = User;
const Group = GroupModel(sequelize, Sequelize);
exports.Group = Group;
User.belongsToMany(Group, { through: UserGroup, unique: false });
Group.belongsToMany(User, { through: UserGroup, unique: false });
sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const groups = yield Group.bulkCreate(group_1.MOCK_GROUPS, { transaction: t });
            return groups;
        }));
    }
    catch (error) {
        console.log(error);
    }
    try {
        yield sequelize
            .transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield User.bulkCreate(user_1.MOCK_USERS, { transaction: t });
            return users;
        }))
            .then(addUsersToGroup);
    }
    catch (error) {
        console.log(error);
    }
}));
const addUsersToGroup = (users) => {
    Group.findAll().then((groups) => {
        groups.forEach((group) => {
            group
                .setUsers(users)
                .then(() => {
                console.log('Users added to Group successfully');
            })
                .catch((err) => {
                console.log(err);
            });
        });
    });
};
//# sourceMappingURL=database.js.map