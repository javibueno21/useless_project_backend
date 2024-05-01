// Imports
import mongoose from 'mongoose';
import { IUser } from '../types/User';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

/**
 * User DOC mongoose schema
 * @extends IUser
 */
const UserSchema = new Schema<IUser>(
  {
    img: { type: String, default: '' },
    name: { type: String, default: '' },
    username: {
      type: String,
      default:
        'User' +
        new Date().getTime() +
        Math.random() * (new Date().getTime() - new Date().getTime() - 1) +
        1,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    confirmed: {
      type: Boolean,
      default: false,
    },
    token: { type: String, default: '' },

    role: { type: String, default: 'User' },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(this.password, salt).then((r) => (this.password = r));
});

UserSchema.methods.checkPassword = async function (formPassword: string) {
  return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
