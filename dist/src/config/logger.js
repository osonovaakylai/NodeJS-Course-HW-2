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
const winston_1 = __importDefault(require("winston"));
const dateFormat = () => new Date(Date.now()).toUTCString();
class LoggerService {
    constructor(route) {
        this.log_data = null;
        this.route = route;
        const logger = winston_1.default.createLogger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: `./logs/${route}.log`,
                }),
            ],
            format: winston_1.default.format.printf((info) => {
                let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
                message = info.obj
                    ? message + `data:${JSON.stringify(info.obj)} | `
                    : message;
                message = this.log_data
                    ? message + `log_data:${JSON.stringify(this.log_data)} | `
                    : message;
                return message;
            }),
        });
        this.logger = logger;
    }
    setLogData(log_data) {
        this.log_data = log_data;
    }
    info(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('info', message, obj && {
                obj,
            });
        });
    }
    debug(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('debug', message, obj && {
                obj,
            });
        });
    }
    error(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('error', message, obj && {
                obj,
            });
        });
    }
}
exports.default = LoggerService;
//# sourceMappingURL=logger.js.map