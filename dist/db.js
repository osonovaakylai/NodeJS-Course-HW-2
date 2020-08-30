"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new sequelize_1.Sequelize("postgres://postgres:ldmfj555@localhost:3000/postgres");
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map