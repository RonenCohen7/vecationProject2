import mongoose from "mongoose";
import { appConfig } from "./app-config";
import express from "express"
import { controller } from "./user-controller";
import { errorsMiddleware } from "@vacation/restify";
import dotenv from "dotenv"
import path from "path";
import { jwt } from "@vacation/jwt";
dotenv.config()

class App {

    public async start(): Promise<void> {
        try {
            await mongoose.connect(appConfig.mongoConnectionString);
            console.log("Mongoose Connected Auth");
            const server = express()
            server.use("/ping", errorsMiddleware.ping)
            server.use(express.json());
            server.use(controller.router)
            server.use(errorsMiddleware.routeNotFound)
            server.use(errorsMiddleware.catchAll)
            server.listen(appConfig.port, () => {
                console.log("Listening on port " + appConfig.port);
            })

        } catch (err: any) {
            console.log(err.message);

        }
    }
}


const app = new App();
app.start();