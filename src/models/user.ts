import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: String,
  login: String,
  password: String,
  age: Number,
  isDeleted: Boolean,
});

mongoose.model('User', UserSchema);
const User = mongoose.model('User');

export default User;
