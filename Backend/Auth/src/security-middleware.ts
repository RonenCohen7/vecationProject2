import { NextFunction, Request, Response } from "express";

import striptags from "striptags";
import { StatusCode, UnauthorizedError } from "@vacation/restify";
import { jwt } from "@vacation/jwt";

class SecurityMiddleware {

    private blackListedIPs = ["119.50.78.3", "200.100.50.20"]; // Demo for black list IPs...

    // Short-Circuit Middleware
    public blackList = (request: Request, response: Response, next: NextFunction) => {

        // Get user IP:
        const ip = (request.headers["x-forwarded-for"] as string)?.split(",")[0] || request.socket.remoteAddress;

        // If it is black-listed: 
        if (this.blackListedIPs.includes(ip!)) {
            response.status(StatusCode.Unauthorized).send("You are not authorized!");
            return;
        }

        // Continue the request to next middleware: 
        next();
    }

    // Verify token:
    public verifyToken(request: Request, response: Response, next: NextFunction) {
        const header = request.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return next(new UnauthorizedError("You are not logged-in."));
        }
        // Extract token (authorization: Bearer the-token)
        //                               01234567...
        const token = header.substring(7);

        // If token is illegal:
        if (!jwt.verifyToken(token!)) {
            next(new UnauthorizedError("You are not logged-in."));
            return;
        }

        // All is good:
        next();
    }

    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction) {

        const header = request.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return next(new UnauthorizedError("You are not logged-in."));
        }
        // Extract token (authorization: Bearer the-token)
        //                               01234567...
        const token = header.substring(7);

        // If token is illegal:
        if (!jwt.verifyToken(token!)) {
            return next(new UnauthorizedError("You are not authorized."));

        }
        const role = jwt.getRole(token);
        if (role !== "admin") {
            return next(new UnauthorizedError("you are not authorized"))
        }

        // All is good:
        next();
    }

    //prevent XssAttacks
    public preventXssAttack(request: Request, response: Response, next: NextFunction) {
        for (const prop in request.body) {
            if (typeof request.body[prop] === "string") {
                request.body[prop] = striptags(request.body[prop])
            }
        }
        next()
    }
}

export const securityMiddleware = new SecurityMiddleware();
