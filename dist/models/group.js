"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const GroupSchema = new Schema({
    id: String,
    name: String,
    permissions: Array,
});
mongoose_1.default.model('Group', GroupSchema);
const Group = mongoose_1.default.model('Group');
exports.default = Group;
//# sourceMappingURL=group.js.map