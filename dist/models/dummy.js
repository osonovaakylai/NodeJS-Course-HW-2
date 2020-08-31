"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../loaders/database");
let Note = database_1.sequelize.define("note", {
    note: sequelize_1.default.TEXT,
    tag: sequelize_1.default.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Note;
//# sourceMappingURL=dummy.js.map