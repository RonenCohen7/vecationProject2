import express, { Request, Response, Router } from "express";
import { UserModel } from "./user-model";
import { userService } from "./user-service";


class Controller {

    public router: Router = express.Router();

    public constructor() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
    }

    private async register(request: Request, response: Response) {
        const user = new UserModel(request.body);
        const token = await userService.register(user)
        console.log("BODY:", request.body);
        response.status(201).json(token);
    }

    private async login(request: Request, response: Response) {
        const user = new UserModel(request.body);
        const token = await userService.login(user)
        response.json(token);
    }
}

export const controller = new Controller();
