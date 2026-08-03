import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import type { CurrentUserPayload } from '../interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);