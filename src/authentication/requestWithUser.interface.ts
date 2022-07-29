import { Request } from 'express';
import { IUser } from '../users/user.schema';

interface RequestWithUser extends Request {
  user: IUser;
}

export default RequestWithUser;
