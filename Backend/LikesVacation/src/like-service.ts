import { ResourceNotFoundError, ValidationError } from "@vacation/restify";
import { ILikeModel, likeModel, LikeSchema } from "./like-model";
import { Types } from "mongoose";

class LikesService {

    //Get All likes
    public async getAllLikes(): Promise<ILikeModel[]> {
        const likes = await likeModel.find().exec();
        return likes;
    }

    //Add new Like
    public async addLike(userId: string, vacationId: string): Promise<ILikeModel> {
        try {
            const like = new likeModel({
                userId: new Types.ObjectId(userId),
                vacationId: new Types.ObjectId(vacationId)
            });

            const error = like.validateSync()
            if (error) throw new ValidationError(error.message)
            return like.save()

        } catch (err: any) {
            throw new ValidationError("Already liked this vacation")
        }

    }


    //Remove like
    public async removeLike(userId: string, vacationId: string): Promise<void> {
        const result = await likeModel.deleteOne({ userId, vacationId })
        console.log("REMOVE LIKE USER:", userId);
        console.log("REMOVE LIKE VACATION:", vacationId);
        if (result.deletedCount === 0) {
            throw new ResourceNotFoundError("Like not found")
        }

    }



    
    public async getLikesCountByVacation(): Promise<any[]> {
        return likeModel.aggregate([{ $group: { _id: "$vacationId", likesCount: { $sum: 1 } } }])
    }


   


  
}



export const likesService = new LikesService();