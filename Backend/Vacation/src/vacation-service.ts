import { ResourceNotFoundError, ValidationError } from "@vacation/restify";
import { IVacationModel, VacationModel } from "./vacation-model";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./app-config";
import { gpt } from "@vacation/gpt";


class VacationService {

    //Get All Vacation sort by start date
    public async getAllVacation(page: number) {
        const limit = 9;
        const skip = (page - 1) * limit;

        const [vacation, total] = await Promise.all([
            VacationModel.find()
                .sort({ startDate: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            VacationModel.countDocuments()
        ]);
        const mapped = vacation.map(v => {
            const obj = v.toObject();
            obj.imageUrl = obj.imageName
                ? appConfig.vacationWebUrl + obj.imageName
                : null as any;
            return obj;
        });
        return {
            items: mapped,
            total,
            page,
            pageSize: limit
        }
    }

    //Get all Active vacation
    public async getActiveVacation(): Promise<IVacationModel[]> {
        const today = new Date()
        const activeVacation = await VacationModel.find({
            startDate: { $lt: today },
            endDate: { $gte: today }
        }).sort({ startDate: 1 })
        return activeVacation
    }


    //Get Upcoming Vacation
    public async getUpcomingVacation() {
        const today = new Date()
        const vacations = await VacationModel.find({
            startDate: { $gt: today }
        }).sort({ startDate: 1 }).exec()
        return vacations
    }


    //Get One Vacation
    public async getOneVacation(_id: string): Promise<IVacationModel> {
        const vacation = await VacationModel.findById(_id).exec();
        if (!vacation) throw new ResourceNotFoundError(_id)
        const obj = vacation.toObject();
        obj.imageUrl = obj.imageName ? appConfig.vacationWebUrl + obj.imageName : null!;

        return obj as any;
    }


    //Add new Vacation
    public async addVacation(vacation: IVacationModel, image?: UploadedFile): Promise<IVacationModel> {
        const error = vacation.validateSync()
        if (error) throw new ValidationError(error.message);
        vacation.imageName = image ? await fileSaver.add(image, appConfig.vacationImages) : null!

        return vacation.save();
    }


    //Get Image Name
    private async getImageName(_id: string): Promise<string | null> {
        const vacation = await VacationModel.findById(_id).exec();
        if (!vacation) return null;
        return vacation.imageName as any;

    }


    //Update Vacation
    public async updateVacation(_id: string, updateData: Partial<IVacationModel>, image?: UploadedFile): Promise<IVacationModel> {
        const existingVacation = await VacationModel.findById(_id).exec();
        if (!existingVacation) throw new ResourceNotFoundError(_id);
        if (image) {
            const newImageName = await fileSaver.update(existingVacation.imageName, image, appConfig.vacationImages);
            updateData.imageName = newImageName
        }

        const updateVacation = await VacationModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true }).exec()

        return updateVacation!
    }

    //Delete Vacation
    public async deleteVacation(_id: string): Promise<void> {
        const vacation = await VacationModel.findByIdAndDelete(_id);
        if (!vacation) throw new ResourceNotFoundError(_id)

        if (vacation.imageName) {
            await fileSaver.delete(vacation.imageName, appConfig.vacationImages)
        }
    }

    //Get Recommend from gpt 
    public async getRecommend(_id: string): Promise<string> {
        console.log("ENTER getRecommend", _id);

        const vacation = await this.getOneVacation(_id);
        console.log("FOUND VACATION:", vacation.destination);
        console.log("im on gpt get your id vacation");
    
        const systemContent = "You are a professional tour guide in the world who knows favorite places for vacationers You know how to combine cultural tourist routes with culinary routes ,You also know how to recommend adventure travel routes.Return recommendations in JSON format";
        const userContent = `
                Give a short travel recommendation for tourists visiting ${vacation.destination}.
                Include:
                - cultural places
                - local food
                - adventure activities
                Keep it under 120 words.
                `;
        const recommend = await gpt.getCompletion(systemContent, userContent);
        console.log("im sending the recommend");
        console.log("im sending the recommend");
        
        return recommend;
    }


}





export const vacationService = new VacationService();