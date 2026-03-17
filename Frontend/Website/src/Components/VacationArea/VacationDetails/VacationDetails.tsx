


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

                <div className="dates">

                    Start Date: {vacation && new Date(vacation.startDate).toLocaleDateString()}
                    <br></br>
                    End Date: {vacation && new Date(vacation.endDate).toLocaleDateString()}

                    <br></br><br></br>


                    {vacation && <VacationWeather destination={vacation.destination} />}

                </div>

                <h3 className="price"> Price: ${vacation?.price}</h3>

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
