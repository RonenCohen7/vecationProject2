import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../../Models/VacationModel";
import { useTitle } from "../../../Utils/UseTitle";
import { notify } from "../../../Utils/Notify";
import { vacationService } from "../../../Services/VacationService";
import { useForm } from "react-hook-form";
import "./AddVacation.css"


export function AddVacation() {
    useTitle("Add Vacation")

    const { register, handleSubmit , getValues} = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            const imageFile = (vacation.imageName as unknown as FileList)?.[0];

            await vacationService.addVacation(vacation, imageFile!)
            notify.success("Vacation Add")
            navigate("/vacations")

        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <label>Add Destination</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={20} />


                <label>Add Description</label>
                <input type="text" {...register("description")} required minLength={2} maxLength={200} />

                <label>Add Date Start</label>
                <input type="date" {...register("startDate")} required />

                <label>Add Date End</label>
                <input
                    type="date"
                    {...register("endDate", {
                        required: "End date is required",
                        validate: (value) => {
                            const startDate = getValues("startDate");
                            return new Date(value) > new Date(startDate) || "End date must be after start date";
                        }
                    })}
                />
                <label>Add Price</label>
                <input type="number" {...register("price")} required min={1} max={10000} />

                <label>Add Image</label>
                <input type="file" {...register("imageName")} />

                <button>Add</button>



            </form>

        </div>
    )
}