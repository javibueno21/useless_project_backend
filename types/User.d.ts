import { Schema } from 'mongoose';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  img: string;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  token: string;
  role: string;
  checkPassword: (password: string) => Promise<boolean>;
}

export { IUser };
