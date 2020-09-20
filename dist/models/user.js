module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.UUID,
            primaryKey: true,
        },
        login: {
            type: type.STRING,
            unique: true,
        },
        password: {
            type: type.STRING,
        },
        age: {
            type: type.INTEGER,
        },
        isDeleted: {
            type: type.BOOLEAN,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });
};
<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    id: String,
    login: String,
    password: String,
    age: Number,
    isDeleted: Boolean
});
mongoose_1.default.model('User', UserSchema);
const User = mongoose_1.default.model('User');
exports.default = User;
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
//# sourceMappingURL=user.js.map