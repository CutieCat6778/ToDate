import * as mongoose from 'mongoose';

export const DateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId(),
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
          enum: ["Accepted", "Declined", "Unknown"],
          default: "Unknown"
        }
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
    type: String,
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
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Date"
        },
      },
    ],
    default: [],
  },
});
