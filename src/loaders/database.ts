const Sequelize = require('sequelize');
import config from '../config/index';
import { IGroup, IUser } from '../interfaces/user';
import { MOCK_GROUPS } from '../mockData/group';
import { MOCK_USERS } from '../mockData/user';
const UserModel = require('../models/user');
const GroupModel = require('../models/group');
import Logger from '../config/logger'
import { ERROR_MESSAGE } from '../util/constants';

const logger = new Logger('app')

// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err: any) => {
    logger.error('Unable to connect to the database:')
    console.error(err);
  });

const UserGroup = sequelize.define('user_group', {});
const User = UserModel(sequelize, Sequelize);
const Group = GroupModel(sequelize, Sequelize);

User.belongsToMany(Group, { through: UserGroup, unique: false });
Group.belongsToMany(User, { through: UserGroup, unique: false });

sequelize.sync({ force: true }).then(async () => {
  try {
    await sequelize.transaction(async (t: any) => {
      const groups = await Group.bulkCreate(MOCK_GROUPS, { transaction: t });
      return groups;
    });
  } catch (error) {
    logger.error(ERROR_MESSAGE)
    console.error(error);
  }

  try {
    await sequelize
      .transaction(async (t: any) => {
        const users = await User.bulkCreate(MOCK_USERS, { transaction: t });
        return users;
      })
      .then(addUsersToGroup);
  } catch (error) {
    logger.error(ERROR_MESSAGE)
    console.error(error);
  }
});

const addUsersToGroup = (users: IUser[]) => {
  Group.findAll().then((groups: IGroup[]) => {
    groups.forEach((group: IGroup) => {
      group
        .setUsers(users)
        .then(() => {
          console.log('Users added to Group successfully');
        })
        .catch((err: any) => {
          logger.error(ERROR_MESSAGE)
          console.error(err);
        });
    });
  });
};

export { sequelize, User, Group, UserGroup };
