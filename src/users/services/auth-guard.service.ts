import { CanActivate, ExecutionContext, Inject, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
const IS_PUBLIC_KEY = 'IS_PUBLIC'
export const IsPublic = Reflector.createDecorator();
export class UserAuthGuard implements CanActivate{
    @Inject(JwtService)
    private readonly jwtService: JwtService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const metadata = context.getClass().prototype[IS_PUBLIC_KEY];
        if()
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