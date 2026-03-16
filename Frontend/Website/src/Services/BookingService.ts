import axios from "axios";
import { BookingModel } from "../../Models/BookingModel"
import { appConfig } from "../Utils/AppConfig";
import { userService } from "./UserService";


class BookingService {

    private headers() {
        const token = localStorage.getItem("token")
        return { Authorization: `Bearer ${token}` }
    }


    //Add booking 
    public async addBooking(vacationId: string, person: number): Promise<BookingModel> {
        const response = await axios.post<BookingModel>(appConfig.bookingUrl, { vacationId, person }, { headers: this.headers() })
        return response.data

    }

    //Get Booking by User
    public async getBookingByUserId():Promise<BookingModel[]>{
        const userId = userService.getUser()?.userId;
        const response = await axios.get<BookingModel[]>(`${appConfig.bookingUrl}/${userId}`,{headers: this.headers()});
        return response.data
    }

    //delete booking
    public async deleteBooking(_id: string):Promise<void>{
        await axios.delete(`${appConfig.bookingUrl}/${_id}`, {headers: this.headers()})
    }





}

export const bookingService = new BookingService();