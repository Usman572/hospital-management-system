import { UserRole } from '../schema/user.schema';

export interface CurrentUserPayload {
  userId: string;
  email: string;
 role: UserRole;
}