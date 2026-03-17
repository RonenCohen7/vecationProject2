


import { useEffect, useState } from "react";
import { useTitle } from "../../../Utils/UseTitle";
import "./VacationDetails.css"
import { VacationModel } from "../../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { appConfig } from "../../../Utils/AppConfig";
import { VacationMap } from "../VacationMap/VacationMap";
import { VacationWeather } from "../VacationWeather/VacationWeather";



export function VacationDetails() {
    useTitle("Details")

    const imageBase = appConfig.imageUrl;
    const [vacation, setVacation] = useState<VacationModel>()
    const params = useParams();
    const navigate = useNavigate();
    const _id = params._id



    const days = vacation? Math.ceil(new Date(vacation.endDate).getTime() - new Date(vacation.startDate).getTime()) / (1000 * 60 * 60 * 24) + 1 : 0;


    function returnBack() {
        navigate("/vacations")
    }

    function recommendAi() {
        navigate(`/AIRecommend/${_id}`)
    }



    useEffect(() => {
        vacationService.getOneVacation(_id as string)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))
    }, []);


    return (
        <div className="VacationDetails">
            <div className="vacation-info">

                <h2 className="Destination">{vacation?.destination}</h2>

                <p className="description"> {vacation?.description}</p>
                <h3 className="price"> Price: ${vacation?.price}</h3>


                <div className="dates">

                    Start Date: {vacation && new Date(vacation.startDate).toLocaleDateString("en-GB")}
                    <br></br>
                    End Date: {vacation && new Date(vacation.endDate).toLocaleDateString("en-GB")}

                    <br></br><br></br>


                    {vacation && <VacationWeather destination={vacation.destination} days={days}
                    startDate={vacation.startDate} endDate={vacation.endDate}/>}

                </div>



                <div className="details-buttons">

                    <button onClick={recommendAi} className="cardAI" data-tooltip="AI Recommendation">🤖</button>

                    <button onClick={() => navigate(`/booking/${_id}`)} className="cardBook" data-tooltip="Book Now">🛫</button>

                    <button onClick={returnBack} className="cardDetails" data-tooltip="Back to Vacations">📃</button>

                </div>


            </div>
            <div className="right-column">
                {vacation?.imageUrl && (
                    <img className="imgLeftAllSide"
                        src={imageBase + vacation.imageName}
                        alt={vacation.destination}
                    />
                )}
                <div className="map-container">
                    {vacation && (<VacationMap destination={vacation.destination} />)}
                </div>
            </div>


        </div>

    );
}
