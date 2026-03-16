import { useNavigate, useParams } from "react-router-dom"
import { useTitle } from "../../../Utils/UseTitle"
import "./BookingVacation.css"
import { useEffect, useState } from "react";
import { VacationModel } from "../../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { bookingService } from "../../../Services/BookingService";


export function Booking() {
    useTitle("Book Vacation")

    const { _id } = useParams();
    const navigate = useNavigate();

    const [vacation, setVacation] = useState<VacationModel>();
    const [person, setPerson] = useState(1);
    const [loading, setLoading] = useState(false)
    const [booked, setBooked] = useState(false);

    useEffect(() => {
        vacationService.getOneVacation(_id as any)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))
    }, []);

    async function handleBook() {
        try {
            setLoading(true);
            await bookingService.addBooking(_id as any, person)
            notify.success("Vacation booked successfully ✈️")
            navigate("/vacations");
        } catch (err) {
            notify.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="booking-page">
            <h2>Book Vacation ✈️</h2>
            { vacation ? (
                <>
                
            <h3>{vacation?.destination}</h3>
            <p>{vacation?.description}</p>
            <p>
                📆{new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation?.endDate).toLocaleDateString()}
            </p>
            <p>💰 ${vacation?.price}</p>

            <div className="booking-form">
                <label>Number Of Guests</label>
                <input type="number" min={1} max={10} value={person} onChange={e => setPerson(Number(e.target.value))} />
                <p className="total">Total: ${vacation?.price * person}</p>

                <button onClick={handleBook} disabled={loading || booked} className="btn-confirm">
                    {loading ? "Booking...." : booked ? "Booked ✅" : "Confirm Booking ✈️"}
                </button>
                <button onClick={() => navigate(-1)} className="btn-cancel">Cancel</button>

            </div>
            </>
            ):(
                <p>Loading...</p>
            )}
        </div>




    )




}