// import jwt from 'jsonwebtoken'
// // import Promise from 'bluebird'
// const Sequelize = require('sequelize');
// import config from '../../config/index';
// import * as database from '../../loaders/database'
// const { User, Group, UserGroup, sequelize } = database
// const testHelper = {
//   cleanDatabase: () =>
//     Promise.all(
//       Object.keys(database).map((key) => {
//         if (['sequelize', 'Sequelize'].includes(key)) return null;
//         return database[key].destroy({ where: {}, force: true });
//       })
//     ),
//   withLogin: async (req, body = {login: 'user1', password: 'user1Pass'} ) => {
//     const user = await User.findOne({ login: body.login })
//     const authToken = jwt.sign({ id: user.id }, config.secret);
//     return req.set('x-access-token', `${authToken}`);
//   },
// };
// export default testHelper
//# sourceMappingURL=utils.js.map