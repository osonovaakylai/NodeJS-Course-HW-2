<<<<<<< HEAD
module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
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
=======
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: String,
  login: String,
  password: String,
  age: Number,
  isDeleted: Boolean
})

mongoose.model('User', UserSchema)
const User = mongoose.model('User')

export default User
>>>>>>> a460fefbbc63cf6157cf231b808a88db686f3827
