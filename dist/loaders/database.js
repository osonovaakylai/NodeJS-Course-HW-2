"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const Sequelize = require('sequelize');
const index_1 = __importDefault(require("../config/index"));
// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
exports.sequelize = new Sequelize(index_1.default.databaseURL);
exports.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
const User = exports.sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.INTEGER,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);
    User.bulkCreate([
        {
            id: '3a13f65e-3d4a-45b2-967b-2a57f37413b1',
            login: 'user1',
            password: 'user1Pass',
            age: 22,
            isDeleted: false,
        },
        {
            id: '3a13f65e-3d4a-45b2-967b-2a57f37413b2',
            login: 'user2',
            password: 'user2Pass',
            age: 42,
            isDeleted: false,
        }
    ])
        .then(function () {
        return User.findAll();
    })
        .then(function (users) {
        console.log(users);
    });
});
//# sourceMappingURL=database.js.map