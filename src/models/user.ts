module.exports = (sequelize, type) => {
  return sequelize.define(
    'user',
    {
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
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
