// session.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isBuyerLoggedIn = !!request.session.buyerId; // Check if the buyerId is present in the session

    if (!isBuyerLoggedIn) {
      throw new UnauthorizedException('The user must be logged in.');
    }

    return true;
  }
}
