import { Schema } from 'mongoose';

const DateSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  duration: {
    type: Number,
  },
  title: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  contributors: {
    type: [String],
  },
  public: {
    type: Boolean,
    required: true,
  },
});

const PostSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  event: {
    type: DateSchema,
    required: true,
  },
  visibility: {
    type: Number,
    enum: [0, 1, 2], // 0 Public, 1 friends only, 2 close friends
    required: true,
    default: 0,
  },
  cancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  calendar: {
    type: [DateSchema],
    required: true,
    default: [],
  },
  posts: {
    type: [PostSchema],
    required: true,
    default: [],
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
