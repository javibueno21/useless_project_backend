import { Document, Types } from 'mongoose';
import ITournament from './Tournament';
import { IUser } from './User';

interface IOrganization extends Document {
  name: string;
  members: ObjectId[] | IUser[];
  prestige: number;
  stats: Object;
  img: string;
  description: string;
  banner: string;
}

export default IOrganization;
