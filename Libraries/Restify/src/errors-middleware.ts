import { NextFunction, Request, Response } from "express";
import { StatusCode } from "./enums";
import { RouteNotFoundError } from "./client-errors";

class ErrorsMiddleware {
       //Ping
    public ping(request: Request, response: Response, next: NextFunction){
        response.send("pong");
    }

    // Catch-All Middleware
    public catchAll(err: any, request: Request, response: Response, next: NextFunction) {

        // Display error on console: 
        console.error(err);

        // Extract status: 
        const status = err.status || StatusCode.InternalServerError;

        // Is server error: 
        const isServerError = status >= 500 && status <= 599;

        // Extract message: 
        const message = err.message;

        // Report back: 
        response.status(status).json({ message });
    }

    // Route not found: 
    public routeNotFound(request: Request, response: Response, next: NextFunction) {
        next(new RouteNotFoundError(request.originalUrl));
    }

}

export const errorsMiddleware = new ErrorsMiddleware();
