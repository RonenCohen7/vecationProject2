import mongoose from "mongoose";

import express from "express";
import { jwtMiddleware } from "@vacation/jwt";
import { errorsMiddleware } from "@vacation/restify";
import { bookingController } from "./booking-controller"
import dotenv from "dotenv";
import { appConfig } from "./app-config";

dotenv.config();

class App {

    public async start(): Promise<void> {
        try {

            await mongoose.connect(appConfig.mongoConnectionString);

            console.log("Connected to:", mongoose.connection.host);
            console.log("DB:", mongoose.connection.name);

            const server = express();

            server.use("/ping", errorsMiddleware.ping);
            server.use(express.json());

            // JWT protection
            server.use(jwtMiddleware.verifyToken);

            // routes
            server.use(bookingController.router);

            // errors
            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);

            server.listen(appConfig.port, () => {
                console.log("Listening on port " + appConfig.port);
            });

        } catch (err: any) {
            console.log(err.message);
        }
    }
}

const app = new App();
app.start();
