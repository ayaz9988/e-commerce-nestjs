import { Injectable, NestMiddleware } from "@nestjs/common";
import { isArray } from "class-validator";
import e, { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

declare global {
    namespace Express {
        interface Request {
            currentUser: UserEntity | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
            req.currentUser = null;
            next();
        } else {
            try {
                const token = authHeader.split(' ')[1];
                const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
                const currentUser = await this.usersService.findOne(+id);
                req.currentUser = currentUser;
                next();
            } catch (e) {
                req.currentUser = null;
                next();
            }
        }
    }
}

interface JwtPayload {
    id: string;
}