import mongoose from "mongoose";
import { appConfig } from "./app-config";
import express from "express"
import { jwtMiddleware } from "@vacation/jwt";
import { errorsMiddleware } from "@vacation/restify";
import { vacationController } from "./vacation-controller";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv"


dotenv.config()
class App {

    public async start(): Promise<void> {
        try {
            await mongoose.connect(appConfig.mongoConnectionString);
            console.log("Connected to:", mongoose.connection.host);
            console.log("DB:", mongoose.connection.name);
            const server = express()
            server.use("/ping", errorsMiddleware.ping)
            server.use(express.json());
            server.use(fileUpload());


            // server.use("/images",express.static(path.join(__dirname, "..","..","..","uploads")))
            // server.use("/images", express.static(path.resolve("uploads")));
            // server.use("/images", express.static("/app/Backend/Vacation/uploads"));
             server.use("/images", express.static(appConfig.vacationImages));
            
            server.use(vacationController.router)
            server.use(errorsMiddleware.routeNotFound)
            server.use(errorsMiddleware.catchAll)
            server.listen(appConfig.port, () => { console.log("Listening on port " + appConfig.port); })

        } catch (err: any) {
            console.log(err.message);

        }
    }
}


const app = new App();
app.start();