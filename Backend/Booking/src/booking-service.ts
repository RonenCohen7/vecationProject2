import { BookingModel, IBookingModel } from "./booking-model";
import { Types } from "mongoose";


class BookingService {

    //Add new Booking
    public async addBooking(bookingData: IBookingModel): Promise<IBookingModel>{
        const booking = new BookingModel(bookingData)
        return booking.save()
    }

    //Get All Booking
    public async getAllBookings():Promise<IBookingModel[]>{
        return BookingModel.find().exec()
    }

    //Get Booking By Id
    public async getBookingById(_id:string):Promise<IBookingModel | null>{
        return BookingModel.findById(_id)
    }

    //Get Booking By User
    public async getBookingByUser(userId: string):Promise<IBookingModel[]>{
        return BookingModel.find({userId: new Types.ObjectId(userId)}).exec();
    }

    //Delete Booking
    public async deleteBooking(_id:string):Promise<IBookingModel|null>{
        return BookingModel.findByIdAndDelete(_id).exec()
    }
    
}


export const bookingService = new BookingService();