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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsersByParams = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json({ success: true, message: 'Success', data: users || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.getUsersByParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubstring, limit } = req.query;
    try {
        if (req.query && limit && loginSubstring) {
            const filteredUsers = yield user_1.default.find({
                login: { $regex: loginSubstring }
            }).limit(Number(limit));
            res.json({
                success: true,
                message: 'Success',
                data: filteredUsers || []
            });
        }
        else {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'No such user' });
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        res.json({
            success: true,
            message: 'Success',
            data: user || null
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield user_1.default.findOne({ login: req.body.login });
        if (checkdata) {
            res.json({ message: 'User already exist', data: checkdata });
        }
        else {
            const newUser = yield user_1.default.create(req.body);
            if (newUser) {
                res.json({
                    success: true,
                    message: 'Success',
                    data: newUser
                });
            }
        }
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let response;
        if (user) {
            response = {
                success: true,
                message: 'Success',
                data: user
            };
        }
        else {
            response = {
                success: false,
                message: 'No such user'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        let response;
        if (user) {
            response = {
                success: true,
                message: 'Success',
                data: user
            };
        }
        else {
            response = {
                success: false,
                message: 'No such user'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
//# sourceMappingURL=user.js.map