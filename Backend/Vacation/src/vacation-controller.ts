import express, { Request, Response, Router } from "express";
import { VacationModel } from "./vacation-model";
import { vacationService } from "./vacation-service";
import { UploadedFile } from "express-fileupload";
import { StatusCode } from "@vacation/restify";
import { jwt, jwtMiddleware } from "@vacation/jwt";
import { fileSaver } from "uploaded-file-saver";
import { error } from "node:console";





class VacationController {

    public router: Router = express.Router();

    public constructor() {
        //this.router.get("/vacation", jwtMiddleware.verifyToken, this.getAllVacation);
        this.router.get("/vacation",jwtMiddleware.verifyToken, this.getAllVacation);
        this.router.get("/vacation/active", jwtMiddleware.verifyToken, this.getActiveVacation);
        this.router.get("/vacation/upcoming", jwtMiddleware.verifyToken, this.getUpcomingVacation);
        this.router.get("/vacation/:_id", jwtMiddleware.verifyToken, this.getOneVacation);
        this.router.get("/vacation/:_id/recommend", jwtMiddleware.verifyToken, this.getRecommend)
        this.router.post("/vacation", jwtMiddleware.verifyAdmin, this.addVacation);
        this.router.patch("/vacation/:_id", jwtMiddleware.verifyAdmin, this.updateVacation);
        this.router.delete("/vacation/:_id", jwtMiddleware.verifyAdmin, this.deleteVAcation);
    }


    //Get All Vacation sort by start date
    private async getAllVacation(request: Request, response: Response) {
        const page = Number(request.query.page) || 1;
        const result = await vacationService.getAllVacation(page);
        console.log("VACATIONS:", result);
        console.log("SERVICE VERSION RUNNING");
        response.json(result);
    }

    //Get All Active vacation
    private async getActiveVacation(request: Request, response: Response) {
        const vacations = await vacationService.getActiveVacation();
        response.json(vacations);
    }

    //Get All Upcoming vacation
    private async getUpcomingVacation(request: Request, response: Response) {
        const vacation = await vacationService.getUpcomingVacation()
        response.json(vacation)
    }



    //Get One Vacation
    private async getOneVacation(request: Request, response: Response) {
        const _id = request.params._id as string;
        const vacation = await vacationService.getOneVacation(_id)
        response.json(vacation)
    }



    //Add new Vacation
    private async addVacation(request: Request, response: Response) {
        const image = request.files?.image as UploadedFile;
        const vacation = new VacationModel(request.body)
        if (request.files?.image) {
            const image = request.files.image as UploadedFile
        }
        const dbVacation = await vacationService.addVacation(vacation, image)
        response.status(StatusCode.Created).json(dbVacation)
    }

    //Update Vacation
    private async updateVacation(request: Request, response: Response) {
        const _id = request.params._id as string;
        const image = request.files?.image as UploadedFile | undefined
        const updateData = request.body;
        const dbVacation = await vacationService.updateVacation(_id, updateData, image);
        response.json(dbVacation)
    }

    //DELETE vacation
    private async deleteVAcation(request: Request, response: Response) {
        const _id = request.params._id as string
        await vacationService.deleteVacation(_id)
        response.sendStatus(StatusCode.NoContent)

    }


    //get image
    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName;
        const imagePath = fileSaver.getFilePath(imageName as string);
        response.sendFile(imagePath);
    }
    //get Recommend
    public async getRecommend(request: Request, response: Response) {
        try {
            console.log("im controller send req to service");
            
            const _id = request.params._id as string
            const recommend = await vacationService.getRecommend(_id);
            response.status(200).json(recommend)

        } catch (err: any) {
            console.log(err.message)
            response.status(500).json({error: err.message})
        }

        
    }

}

export const vacationController = new VacationController();
