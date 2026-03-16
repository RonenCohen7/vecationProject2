import express, { Request, Response, Router } from "express";
import { StatusCode, UnauthorizedError } from "@vacation/restify";

import { likesService } from "./like-service";

import { jwt, jwtMiddleware } from "@vacation/jwt";





class VacationLikesController {

    public router: Router = express.Router();

    public constructor() {
        
        this.router.get("/likes", jwtMiddleware.verifyToken, this.getAllLikes);
        
        this.router.get("/likes/count", jwtMiddleware.verifyToken, this.getLikesCountByVacation)
        
        this.router.post("/likes/:vacationId", jwtMiddleware.verifyToken, this.addLike);

        this.router.delete("/likes/:vacationId", jwtMiddleware.verifyToken, this.removeLike);


    }


    //Get All likes
    private async getAllLikes(request: Request, response: Response) {
        const likes = await likesService.getAllLikes();
        response.status(201).json(likes);
    }

    //Add like to vacation
    private async addLike(request: Request, response: Response) {
        const header = request.headers.authorization!;
        const token = header!.substring(7)

        const role = jwt.getRole(token)
        if (role === "admin") {
            throw new UnauthorizedError("Admin Cannot like vacation")
        }

        const userId = jwt.getUserId(token)!
        const vacationId = request.params.vacationId as string

        const like = await likesService.addLike(userId, vacationId)
        response.status(StatusCode.Created).json(like)
    }



    //Remove like from vacation
    private async removeLike(request: Request, response: Response) {
        const header = request.headers.authorization!
        const token = header.substring(7);


        const userId = jwt.getUserId(token)!
        const vacationId = request.params.vacationId as string
        await likesService.removeLike(userId, vacationId)
        response.sendStatus(StatusCode.NoContent)

    }

    private async getLikesCountByVacation(request: Request, response: Response) {
        const result = await likesService.getLikesCountByVacation();
        response.json(result)
    }

}

export const vacationLikesController = new VacationLikesController();
