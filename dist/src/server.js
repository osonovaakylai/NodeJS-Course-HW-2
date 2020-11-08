"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./loaders/app"));
const index_1 = __importDefault(require("./config/index"));
const port = parseInt(index_1.default.port);
const server = new app_1.default()
    .Start(port)
    .then((runningPort) => console.log(`Server running on port ${runningPort}`))
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
exports.default = server;
//# sourceMappingURL=server.js.map