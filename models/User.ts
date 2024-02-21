import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  subId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);