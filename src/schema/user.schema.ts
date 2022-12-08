import * as mongoose from 'mongoose';

export const DateSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  time: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },

  inviters: {
    type: [
      {
        confirmed: {
          type: Boolean,
          default: false,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['Accepted', 'Declined', 'Unknown'],
          default: 'Unknown',
        },
      },
    ],
    required: false,
    default: [],
  },

  cancelled: {
    type: Boolean,
    required: true,
    default: false,
  },

  expireIn: {
    type: Number,
    required: true,
  },
});

export const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },

  displayName: {
    type: String,
    required: true,
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

  friends: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
    ],
    default: [],
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

  dates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Date',
      },
    ],
    default: [],
  },
});
