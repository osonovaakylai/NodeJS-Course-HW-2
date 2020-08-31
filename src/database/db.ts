import { Sequelize } from 'sequelize';

// postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const sequelize = new Sequelize(
  'postgres://postgres:ldmfj555@localhost:3000/users'
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
