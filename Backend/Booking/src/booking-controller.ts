import express , {Request, Response, Router} from "express"
import { bookingService } from "./booking-service";
import { IBookingModel } from "./booking-model";
import { jwtMiddleware } from "../../../Libraries/Jwt/build/middleware";

class BookingController {

    public router: Router = express.Router();

    public constructor(){

        this.router.get("/api/booking",jwtMiddleware.verifyToken, this.getAllBooking);
        this.router.get("/api/booking/:_id",jwtMiddleware.verifyToken, this.getBookingById);
        this.router.post("/api/booking",jwtMiddleware.verifyToken, this.addBooking);
        this.router.get("/api/booking/user/:userId", jwtMiddleware.verifyToken, this.getBookingByUser);
        this.router.delete("/api/booking/:_id",jwtMiddleware.verifyToken, this.deleteBooking);
    }

    //Get All Booking
    private async getAllBooking(request: Request, response:Response){
        const bookings = await bookingService.getAllBookings()
        response.json(bookings)
    }


    //Get Booking by Id
    private async getBookingById(request:Request, response: Response){
        const _id = request.params._id as string;
        const booking = await bookingService.getBookingById(_id)
        response.json(booking)
    }
    
    //Add new Booking
    private async addBooking(request:Request, response: Response){
        const bookingData: IBookingModel = {
            ...request.body,
        userId: (request as any).user?.userId}
        const booking = await bookingService.addBooking(bookingData)
        response.status(201).json(booking)
    } 

    //Delete Booking
    private async deleteBooking(request:Request, response:Response){
        const _id = request.params._id;
        const booking = await bookingService.deleteBooking(_id as string)
        response.json(booking)


    }

    //Get booking by User
    private async getBookingByUser(request:Request, response:Response){
        const userId = request.params.userId;
        const bookings = await bookingService.getBookingByUser(userId as string)
        response.json(bookings)
    }
}


export const  bookingController = new BookingController();