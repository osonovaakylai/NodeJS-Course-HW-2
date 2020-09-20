"use strict";
<<<<<<< HEAD
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
    Group.bulkCreate([
        {
            id: '3a13f65e-3d4a-45b2-967b-2a57f3741356',
            name: 'group1',
            permissions: 'READ'
        }
    ]);
    User.bulkCreate([
        {
            id: '3a13f65e-3d4a-45b2-967b-2a57f37413b1',
            login: 'user1',
            password: 'user1Pass',
            age: 22,
            isDeleted: false
        },
        {
            id: '3a13f65e-3d4a-45b2-967b-2a57f37413b2',
            login: 'user2',
            password: 'user2Pass',
            age: 42,
            isDeleted: false
        }
    ])
        .then(() => {
        return User.findAll();
    })
        .then(addUsersToGroup);
}));
const addUsersToGroup = (users) => {
    Group.findAll().then((groups) => {
        groups.forEach((group) => {
            group.setUsers(users)
                .then(() => {
                console.log('Users added to Group successfully');
            })
                .catch((err) => {
                console.log(err);
            });
        });
    });
};
=======
// const Sequelize = require('sequelize');
// import config from '../config/index';
// import { IUser } from '../interfaces/user';
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.User = void 0;
// // postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
// export const sequelize = new Sequelize(config.databaseURL);
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err: any) => {
//     console.error('Unable to connect to the database:', err);
//   });
// const User = sequelize.define(
//   'user',
//   {
//     id: {
//       type: Sequelize.UUID,
//       primaryKey: true
//     },
//     login: {
//       type: Sequelize.STRING,
//       unique: true
//     },
//     password: {
//       type: Sequelize.STRING
//     },
//     age: {
//       type: Sequelize.INTEGER
//     },
//     isDeleted: {
//       type: Sequelize.BOOLEAN
//     }
//   },
//   {
//     timestamps: false,
//     freezeTableName: true
//   }
// );
// sequelize.sync({ force: true }).then(() => {
//   User.bulkCreate([
//     {
//       id: '3a13f65e-3d4a-45b2-967b-2a57f37413b1',
//       login: 'user1',
//       password: 'user1Pass',
//       age: 22,
//       isDeleted: false
//     },
//     {
//       id: '3a13f65e-3d4a-45b2-967b-2a57f37413b2',
//       login: 'user2',
//       password: 'user2Pass',
//       age: 42,
//       isDeleted: false
//     }
//   ])
//     .then(() => {
//       return User.findAll();
//     })
//     .then((users: IUser[]) => {
//       console.log(users);
//     });
// });
const mongoose = require('mongoose');
const data = [
    {
        id: '3a13f65e-3d4a-45b2-967b-2a57f37413b1',
        login: 'user1',
        password: 'user1Pass',
        age: 22,
        isDeleted: false
    },
    {
        id: '3a13f65e-3d4a-45b2-967b-2a57f37413b2',
        login: 'user2',
        password: 'user2Pass',
        age: 42,
        isDeleted: false
    }
];
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    id: String,
    login: String,
    password: String,
    age: Number,
    isDeleted: Boolean
});
mongoose.model('User', UserSchema);
exports.User = mongoose.model('User');
mongoose.connect('mongodb://localhost:27017/homework', (err) => {
    if (err)
        throw err;
    data.forEach((item) => {
        // User.create(item)
    }, (error) => {
        if (error) {
            console.log(error);
        }
    });
});
exports.db = mongoose.connection;
exports.db.on('error', console.error.bind(console, 'connection error:'));
exports.db.once('open', function () {
    console.log('Connection has been established successfully.');
});
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
//# sourceMappingURL=database.js.map