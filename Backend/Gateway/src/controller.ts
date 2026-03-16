import { jwtMiddleware } from "@vacation/jwt";
import express, { Router, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { appConfig } from "./app-config";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import axios from "axios";
import { log, trace } from "node:console";

class Controller {

    public router: Router = express.Router();

    public constructor() {
        console.log("Controller Loaded");

        this.router.use((req, res, next) => {
            console.log("REQUEST:", req.method, req.originalUrl);
            next();
        });

        console.log("Controller Loaded");
        // Auth Microservice navigation: 


          //images
       // this.router.use(createProxyMiddleware({ target: appConfig.vacationUrl, changeOrigin: true, pathFilter: "/images" }));
        this.router.use("/images",createProxyMiddleware({ target: appConfig.vacationUrl, changeOrigin: true,pathRewrite: { "^": "/images"} }));


        //Feed feed Vacation
        this.router.get("/api/feed", jwtMiddleware.verifyToken, this.getFeed);


        // this.router.use("/api/auth/login", authProxy);
        this.router.use("/api/auth", createProxyMiddleware({ target: appConfig.authUrl, changeOrigin: true, pathRewrite: { "^/api/auth": "api/auth" } }));


        // Likes Microservice navigation: 
        this.router.use("/api/likes", createProxyMiddleware({ target: appConfig.likesUrl, changeOrigin: true, pathRewrite: { "^/api/likes": "" } }));


        // Vacation Microservice navigation: 
        this.router.use("/api/vacation", createProxyMiddleware({ target: appConfig.vacationUrl, changeOrigin: true, pathRewrite: { "^/api/vacation": "" } }));

        // Booking microservice navigate:
        this.router.use("/api/booking", createProxyMiddleware({target: appConfig.bookingUrl, changeOrigin: true,   pathRewrite: { "^": "/api/booking"  }}))

    }

    private async getFeed(request: Request, response: Response) {
        try {

            const token = request.headers.authorization;
            const page = Number(request.query.page) || 1;

            const vacationResponse = await axios.get(
                `${appConfig.vacationUrl}/vacation?page=${page}`,
                { headers: { Authorization: token } }
            );

            const vacations = vacationResponse.data.items ?? vacationResponse.data;


            const likeResponse = await axios.get(
                `${appConfig.likesUrl}/likes`,
                { headers: { Authorization: token } }
            );

            const likes = likeResponse.data.items ?? likeResponse.data;

            const auth = request.headers.authorization || "";
            const tokenOnly = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

            const payload: any = jsonwebtoken.decode(tokenOnly);
            const userId = payload?.userId;

            const feed = vacations.map((vacation: any) => {
                const vacationLikes = likes.filter((like: any) =>
                    String(like.vacationId) === String(vacation._id)
                );

                return {
                    ...vacation,
                    likesCount: vacationLikes.length,
                    isLikedByMe: vacationLikes.some(
                        (like: any) => String(like.userId) === String(userId)
                    )
                };
            });

            // response.json(feed);
            response.json({
                items: feed,
                total: vacationResponse.data.total,
                page: vacationResponse.data.page,
                pageSize: vacationResponse.data.pageSize
            });

        } catch (err: any) {
            console.log("FEED ERROR:", err.response?.data || err.message);
            response.status(500).json({ message: "Feed Error" });

        }
    }
}

export const controller = new Controller();