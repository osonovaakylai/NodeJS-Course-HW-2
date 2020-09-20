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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroupById = exports.getAllGroups = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../loaders/database");
exports.getAllGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield database_1.Group.findAll();
        res.json({ success: true, message: 'Success', data: groups || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.getGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield database_1.Group.findOne({ where: { id: req.params.id } });
        res.json({
            success: true,
            message: 'Success',
            data: group || null
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = yield database_1.Group.findOne({ where: { name: req.body.name } });
        if (checkdata) {
            res.json({ message: 'Group already exist', data: checkdata });
        }
        else {
            const newUUID = uuid_1.v4();
            const newGroupData = {
                id: newUUID,
                name: req.body.name,
                permissions: req.body.permissions.join(","),
            };
            const newGroup = yield database_1.Group.create(newGroupData, {
                fields: ['id', 'name', 'permissions']
            });
            if (newGroup) {
                res.json({
                    success: true,
                    message: 'Success',
                    data: newGroup
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield database_1.Group.findOne({ where: { id: req.params.id } });
        let response;
        if (group) {
            yield group.update(req.body);
            response = {
                success: true,
                message: 'Success',
                data: group
            };
        }
        else {
            response = {
                success: false,
                message: 'No such group'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
exports.deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRowCount = yield database_1.Group.destroy({ where: { id: req.params.id } });
        let response;
        if (deletedRowCount === 1) {
            response = {
                success: true,
                message: 'Success'
            };
        }
        else {
            response = {
                success: false,
                message: 'No such group'
            };
        }
        return res.json(response);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});
//# sourceMappingURL=group.js.map