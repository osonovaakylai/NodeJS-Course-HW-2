import Sequelize from 'sequelize';
import sequelize from '../database/db';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    login: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    isDeleted: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

export default User;
