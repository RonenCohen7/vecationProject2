import {Document, Types, model, Schema} from "mongoose";

export interface IBookingModel extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    vacationId:Types.ObjectId;
    person: number;
    totalPrice:number;
    status: "pending" | "confirm" |"cancelled"

}

export const BookingSchema = new Schema<IBookingModel>({
    userId:{
        type:Schema.Types.ObjectId,
        required: true
    },
    vacationId: {
        type: Schema.Types.ObjectId,
        required:true
    },
    person: {
        type: Number,
        required: [true, "Missing Count Person"],
        min:[1, "Person must be min 1"],
        max:[4, "Person max 4"]
    },
    totalPrice: {
        type: Number
    },
    status:{
        type:String,
        enum:["pending", "confirmed","cancelled"],
        default:"pending"
    }
},{
    versionKey: false,
    timestamps: true
})

export const BookingModel = model<IBookingModel>("BookingModel", BookingSchema, "booking")
