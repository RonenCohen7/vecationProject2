import { Document, Types, model, Schema } from "mongoose"


export interface ILikeModel extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    vacationId: Types.ObjectId;
}

export const LikeSchema = new Schema<ILikeModel>({
    userId:{
        type: Types.ObjectId,
        ref: "UserModel",
        required:true
    },

    vacationId:{
        type:Types.ObjectId,
        ref: "VacationModel",
        required: true
    }
}, {
    versionKey: false,
    timestamps:true 
});

LikeSchema.index({userId:1, vacationId:1}, {unique:true})

export const likeModel = model<ILikeModel>("LikeModel", LikeSchema,"likes")

