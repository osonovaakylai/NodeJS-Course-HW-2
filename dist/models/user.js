"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    id: String,
    login: String,
    password: String,
    age: Number,
    isDeleted: Boolean,
});
mongoose_1.default.model('User', UserSchema);
const User = mongoose_1.default.model('User');
exports.default = User;
//# sourceMappingURL=user.js.map