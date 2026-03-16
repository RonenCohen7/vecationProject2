import { Document, Types, model, Schema } from "mongoose"

export interface IVacationModel extends Document {
    _id: Types.ObjectId;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
    imageUrl:string
}


export const VacationSchema = new Schema<IVacationModel>({
    destination: {
        type: String,
        required: [true, "Missing destination"],
        minlength: [2, "Destination too short"],
        maxlength: [20, "Destination too long"],
        trim: true
    },
    description: {
        type: String,
        required: [true,"Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [200, "Description too long"],
        trim: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
        required: true,
        validator :function(this:IVacationModel,value:Date) {
            return value > this.startDate
            
        },
        message: "End Date must be after start date"
    },
    price: {
        type: Number,
        required:[true, "Missing Price"],
        min: [1, "Price can't be < 1"],
        max: [10000, "Price Max 10,000"]
    },
    imageName: {
        type: String
    },
    imageUrl: {
        type:String
    }
}, {
    versionKey: false,
    timestamps: true

});
export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations")