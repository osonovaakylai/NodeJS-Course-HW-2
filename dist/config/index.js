"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error('⚠️  Could not find .env file  ⚠️');
}
const secret = 'supersecret';
const corsOptions = {
    origin: 'http://localhost:8080'
};
exports.default = {
    secret,
    corsOptions,
    port: process.env.PORT,
    databasePort: process.env.DB_PORT,
    databaseURL: process.env.DATABASE_URL
};
//# sourceMappingURL=index.js.map