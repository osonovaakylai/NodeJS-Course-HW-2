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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const user_1 = require("../mockData/user");
const user_2 = __importDefault(require("../models/user"));
mongoose_1.default.connect(config_1.default.databaseURL, (err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        throw err;
    yield user_1.MOCK_USERS.forEach((user) => {
        user_2.default.create(user);
    }, (error) => {
        if (error) {
            console.log(error);
        }
    });
}));
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connection has been established successfully.');
});
exports.default = db;
//# sourceMappingURL=database.js.map