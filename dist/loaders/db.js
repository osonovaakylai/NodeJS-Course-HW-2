"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const user_1 = require("../mockData/user");
const user_2 = __importDefault(require("../models/user"));
mongoose_1.default.connect(config_1.default.databaseURL, (err) => {
    if (err)
        throw err;
    user_1.users.forEach((user) => {
        user_2.default.create(user);
    }, (error) => {
        if (error) {
            console.log(error);
        }
    });
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connection has been established successfully.');
});
exports.default = db;
//# sourceMappingURL=db.js.map