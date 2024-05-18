import { CanActivate, ExecutionContext, Inject, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
const IS_PUBLIC_KEY = 'IS_PUBLIC';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class UserAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
           context.getHandler(),
           context.getClass()
       ]);
       if(isPublic)
        return true;
        const request = context.switchToHttp().getRequest();
       const token = request.headers.authorization;
       if(!token)
        return false;
        const user = this.jwtService.verify(token,{
            secret: process.env.JWT_SECRET
        });
        request['user'] = user;
        return true;
    }

}