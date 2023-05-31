import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map, tap } from 'rxjs';


@Injectable()
export class RegInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        response.cookie('refreshToken', data.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
      }))


  }
}
