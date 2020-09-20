const Sequelize = require("sequelize");
import config from "../config/index";
import { IGroup, IUser } from "../interfaces/user";
import { MOCK_GROUPS } from "../mockData/group";
import { MOCK_USERS } from "../mockData/user";
const UserModel = require("../models/user");
const GroupModel = require("../models/group");

// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

const UserGroup = sequelize.define("user_group", {});
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
    console.log(error);
  }

  try {
    await sequelize
      .transaction(async (t: any) => {
        const users = await User.bulkCreate(MOCK_USERS, { transaction: t });
        return users;
      })
      .then(addUsersToGroup);
  } catch (error) {
    console.log(error);
  }
});

const addUsersToGroup = (users: IUser[]) => {
  Group.findAll().then((groups: IGroup[]) => {
    groups.forEach((group: IGroup) => {
      group
        .setUsers(users)
        .then(() => {
          console.log("Users added to Group successfully");
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  });
};

export { sequelize, User, Group, UserGroup };
