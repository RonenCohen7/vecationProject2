import axios from "axios"
import { appConfig } from "../Utils/AppConfig";
import { VacationModel } from "../../Models/VacationModel";
import { store } from "../Redux/Store";
import { vacationSlice } from "../Redux/VacationSlice";
import { LikeReportModel } from "../../Models/LikeReportModel";


class VacationService {

    //Get All Vacation
    public async getAllVacations(): Promise<VacationModel[]> {
        if (store.getState().vacations.length > 0) {
            return store.getState().vacations;
        }
        const response = await axios.get<VacationModel[]>(appConfig.vacationUrl)
        const vacations = response.data;
        const action = vacationSlice.actions.initVacation(vacations);
        store.dispatch(action)

        return vacations;
    }


    //Get One Vacation
    public async getOneVacation(_id: string): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationUrl + "/" + _id);
        const vacation = response.data
        return vacation
    }



    //Add New vacation
    public async addVacation(vacation: VacationModel, image: File): Promise<void> {
        const formData = new FormData();

        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());
        if (image) {
            formData.append("image", image)
        }
        await axios.post(appConfig.vacationUrl, formData)


    }


    //Update Vacation
    public async updateVacation(vacation: VacationModel, image?: File): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());

        if (image) {
            formData.append("image", image)
        }
        const response = await axios.patch(`${appConfig.vacationUrl}/${vacation._id}`, formData)
        const updateVacation = response.data
        store.dispatch(vacationSlice.actions.updateVacation(updateVacation))
    }


    //Add like Vacation
    public async likeVacation(vacationId: string): Promise<void> {
        await axios.post(`${appConfig.likesUrl}/${vacationId}`)

    }
    //Remove Like Vacation
    public async unlikeVacation(vacationId: string): Promise<void> {
        await axios.delete(`${appConfig.likesUrl}/${vacationId}`)
    }


    //Get Likes Count  - from user Add / Remove likes
    public async getLikesCount() {
        const response = await axios.get(appConfig.likesCount);
        return response.data
    }

    //get All by Number Page
    public async getPageByNumber(page: number) {
        const response = await axios.get(appConfig.vacationUrl + "?page=" + page)
        return response.data
    }

    //get feed
    public async getFeed(page: number = 1): Promise<{ items: VacationModel[], total: number, page: number, pageSize: number }> {
        const response = await axios.get(`${appConfig.feedUrl}?page=${page}`) // ← check your gateway route prefix
        return response.data
    }


    //Delete Vacation
    public async deleteVacation(_id: string): Promise<void> {
        await axios.delete(`${appConfig.vacationUrl}/${_id}`);
        store.dispatch(vacationSlice.actions.deleVacation(_id))
    }

    //Get likes Per Vacation for report 
    public async getLikesReport(): Promise<LikeReportModel[]> {
        const response = await axios.get(`${appConfig.likesUrl}`)
        console.log(response.data);

        return response.data
    }


    //Get Data from Feed For Reports:
  public async getLikesReportFeed(): Promise<LikeReportModel[]> {

    const response = await axios.get(`${appConfig.feedUrl}?page=1`);

    const items: VacationModel[] = response.data.items;

    const report = items
        .filter(v => v.likesCount > 0)
        .map(v => ({
            destination: v.destination,
            likesCount: v.likesCount
        }))
        .sort((a, b) => b.likesCount - a.likesCount);

    return report;
}

    //Get Recommend
    public async getRecommend(_id: string):Promise<string>{
        const recommend = await axios.get(`${appConfig.vacationUrl}/${_id}/recommend`);
        return recommend.data
    }

}


export const vacationService = new VacationService();