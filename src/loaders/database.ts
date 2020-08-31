const Sequelize = require('sequelize');
import config from '../config/index';
import { IUser } from '../interfaces/user';

// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
export const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    login: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

sequelize.sync({ force: true }).then(() => {
  User.bulkCreate([
    {
      id: '3a13f65e-3d4a-45b2-967b-2a57f37413b1',
      login: 'user1',
      password: 'user1Pass',
      age: 22,
      isDeleted: false,
    },
    {
      id: '3a13f65e-3d4a-45b2-967b-2a57f37413b2',
      login: 'user2',
      password: 'user2Pass',
      age: 42,
      isDeleted: false,
    }
  ])
    .then(function () {
      return User.findAll();
    })
    .then(function (users: IUser[]) {
      console.log(users);
    });
});
