"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const group_validator_1 = require("../validators/group-validator");
const user_validator_1 = require("../validators/user-validator");
const group_1 = require("../services/group");
const router = express.Router();
router.get('/group', group_1.getAllGroups);
router.post('/group', user_validator_1.validator.body(group_validator_1.groupSchema), group_1.createGroup);
router.get('/group/:id', group_1.getGroupById);
router.put('/group/:id', user_validator_1.validator.body(group_validator_1.groupSchema), group_1.updateGroup);
router.delete('/group/:id', group_1.deleteGroup);
exports.default = router;
//# sourceMappingURL=group-router.js.map