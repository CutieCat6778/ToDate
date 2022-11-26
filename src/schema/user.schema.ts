import * as mongoose from 'mongoose';

export const DateSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    default: {
      $inc: { seq: 1 },
    },
  },

  title: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },

  inviters: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: [],
  },

  cancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId()
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  biography: {
    type: String,
    required: false,
    default: '',
  },

  avatar: {
    type: String,
    required: false,
    default: 'https://cdn.thinh.tech/avatar.png',
  },

  createdAt: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },

  salt: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
    default: '',
  },
});
