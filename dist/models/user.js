"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../loaders/database"));
const User = database_1.default.define('user', {
    id: {
        type: sequelize_1.default.UUID,
        primaryKey: true
    },
    login: {
        type: sequelize_1.default.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.default.STRING
    },
    age: {
        type: sequelize_1.default.INTEGER
    },
    isDeleted: {
        type: sequelize_1.default.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.default = User;
//# sourceMappingURL=user.js.map