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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../api/router"));
const database_1 = require("./database");
const swaggerDocument = __importStar(require("../config/swagger.json"));
const logger_1 = __importDefault(require("../config/logger"));
const index_1 = __importDefault(require("../config/index"));
class App {
    constructor() {
        this.Start = (port) => {
            return new Promise((resolve, reject) => {
                this.httpServer.listen(port, () => {
                    resolve(port);
                    this.logger.info(`Application launched in PORT  ${port}`);
                })
                    .on('error', (err) => {
                    this.logger.error('Something went wrong! ');
                    console.error(err);
                    reject(err);
                });
            });
        };
        this.httpServer = express_1.default();
        this.httpServer.use(express_1.default.json());
        this.db = database_1.sequelize;
        this.logger = new logger_1.default('app');
        new router_1.default(this.httpServer);
        this.httpServer.use(cors_1.default(index_1.default.corsOptions));
        this.httpServer.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map