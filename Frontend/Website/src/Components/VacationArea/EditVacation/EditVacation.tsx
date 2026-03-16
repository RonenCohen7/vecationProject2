import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css"


export function EditVacation(){

    useTitle("Edit-Vacation")


    const { _id } = useParams();
    const navigate = useNavigate();

    const {register, handleSubmit, setValue} = useForm<VacationModel>();
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(()=>{
        vacationService.getOneVacation(_id!)
            .then(v => {
                setValue("destination", v.destination);
                setValue("description", v.description);

                setValue("startDate", new Date(v.startDate).toISOString().split("T")[0]);
                setValue("endDate", new Date(v.endDate).toISOString().split("T")[0]);
                setValue("price", v.price);
                setImageUrl(v.imageUrl)
            })
            .catch(err => notify.error(err))
    },[]);

    async function send(vacation: VacationModel){
        try{
            vacation._id = _id!;
            const fileInput = document.querySelector<HTMLInputElement>(`input[type="file"]`);
            const image = fileInput?.files?.[0]
            await vacationService.updateVacation(vacation, image);
            notify.success("Vacation Update");
            navigate("/vacations")
        }catch(err:any){
            notify.error(err)
        }
    }

    return(
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)}>
                <label>Destination</label>
                <input {...register("destination")}/>

                <label>Description</label>
                <textarea {...register("description")}/>

                <label>Start Date</label>
                <input type="date"{...register("startDate")}/>
                
                <label>End Date</label>
                <input type="date" {...register("endDate")}/>

                <label>Price</label>
                <input type="number" {...register("price")}/>

                <label>Image</label>
                {imageUrl && <div className="image-preview">
                    <img src={imageUrl} alt="vacation"/>
                    </div>}
                <input type="file"/>

                <button>Update</button>
            </form>

        </div>
    )

}