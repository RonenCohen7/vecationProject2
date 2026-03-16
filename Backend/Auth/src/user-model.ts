import { Types, Document, model, Schema } from "mongoose";
import { timeStamp } from "node:console";

export interface IUserModel extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "user" | "admin";

}

export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        // required: [true, "Missing First Name"],
        minlength: [2, "Name too Short"],
        maxlength: [20, "Name too long"],
        trim: true
    },
    lastName: {
        type: String,
        // required: [true, "Missing Last Name"],
        minlength: [2, "Last Name too Short"],
        maxlength: [20, "Last Name too long"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "missing Email"],
        maxlength: [200, "Email too long"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Missing Password"],
        maxlength: [256, "Password to long"],
        minlength: [4, "password too short"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    versionKey: false,
    timestamps: true
});
UserSchema.index({email:1}, {unique:true})

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users")