module.exports = (sequelize, type) => {
    return sequelize.define("group", {
        id: {
            type: type.UUID,
            primaryKey: true,
        },
        name: {
            type: type.STRING,
        },
        permissions: {
            type: type.STRING,
            enum: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });
};
//# sourceMappingURL=group.js.map