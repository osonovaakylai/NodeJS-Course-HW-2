import { Sequelize } from 'sequelize';
import config from '../config/index'

// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
