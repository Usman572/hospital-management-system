import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRole } from '../schema/user.schema';

@Injectable()
export class PatientOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const patientId = request.params.id;

    // Admin can access everything
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Patient can only access their own record
    if (user.userId === patientId) {
      return true;
    }

    throw new ForbiddenException(
      'You can only access your own record.',
    );
  }
}