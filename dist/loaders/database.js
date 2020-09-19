"use strict";
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
//# sourceMappingURL=database.js.map