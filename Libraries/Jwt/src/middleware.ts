import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@vacation/restify";
import { jwt } from "./jwt";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";

class JwtMiddleware {

    public verifyToken(request: Request, response: Response, next: NextFunction) {
        const authorization = request.header("authorization");
        const header = request.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return next(new UnauthorizedError("You are not logged-in."));
        }

        if (!authorization || !authorization.startsWith("Bearer")) {
            return next(new UnauthorizedError("You are not logged-in"))
        }

        const token = authorization?.substring(7);
        console.log("SECRET IN VACATION:", process.env.JWT_SECRET);
        console.log("TOKEN RECEIVED:", token);
      

        if (!jwt.verifyToken(token)) {
            const err = new UnauthorizedError("You are not logged-in.");
            next(err);
            return;
        }
    (request as any).user = jwt.decoded(token)
    console.log("MIDDLEWARE USER SET:", (request as any).user);
        next();
    }


    public verifyAdmin(request: Request, response: Response, next: NextFunction) {
        const header = request.header("authorization");
        if (!header || !header.startsWith("Bearer")) {
            return next(new UnauthorizedError("You are not logged"))
        }

        const token = header.substring(7);

        if (!jwt.verifyToken(token)) {
            return next(new UnauthorizedError("Invalid token"))
        }

        const role = jwt.getRole(token)
        if (role !== "admin") {
            return next(new UnauthorizedError("you are not logged"))
        }
        next()

    }


}

export const jwtMiddleware = new JwtMiddleware();
