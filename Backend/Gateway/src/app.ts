import { errorsMiddleware } from "@vacation/restify";
import express from "express";
import { appConfig } from "./app-config";
import { controller } from "./controller";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

class App {

    public async start(): Promise<void> {
        try {
            const server = express();
            server.use("/ping", errorsMiddleware.ping)
            console.log("Connected Gateway");
            const loginLimiter = rateLimit({
                windowMs: 15 * 60 * 1000,
                max: 40,
                message: "Too many login attempts. Try again later."
            });
            server.use("/api/auth/register", loginLimiter);
            server.use("/api/auth/login", loginLimiter);
            server.use(helmet({
                crossOriginResourcePolicy: { policy: "cross-origin" } // Enable CORS for images.
            }));
            
            const coresOption ={
                origin: "*",
                methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
                allowedHeaders: ["Content-Type", "Authorization"]
            };
            server.use(cors());
            server.options(/.*/,cors(coresOption));
            server.use(controller.router);
            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);
            server.listen(appConfig.port, () => console.log("Listening on port " + appConfig.port))
        }
        catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
