import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  id: String,
  name: String,
  permissions: Array,
});

mongoose.model('Group', GroupSchema);
const Group = mongoose.model('Group');

export default Group;
