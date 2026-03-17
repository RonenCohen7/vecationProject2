import { useEffect, useState } from "react";
import { VacationModel } from "../../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import { vacationService } from "../../../Services/VacationService";
import "./VacationList.css";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { appConfig } from "../../../Utils/AppConfig";



export function ListVacation() {

    const imageBase = appConfig.imageUrl;


    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [showOnlyLiked, setShowOnlyLiked] = useState(false);
    const [filter, setFilter] = useState<"all" | "active" | "upcoming">("all");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();
    const isAdmin = userService.isAdmin();

    async function loadVacation(page: number = 1) {
        try {
            const response = await vacationService.getFeed(page);

            console.log("FEED RESPONSE:", response); // ← add this to see what's coming back

            // Guard against unexpected shape
            if (!response || !response.items) {
                console.error("Unexpected response shape:", response);
                return;
            }

            setVacations(response.items);
            setTotalPages(Math.ceil(response.total / response.pageSize));

        } catch (err) {
            notify.error(err);
        }
    }

    async function toggleLike(vacation: VacationModel) {
        try {

            if (vacation.isLikedByMe) {

                await vacationService.unlikeVacation(vacation._id);

                setVacations(prev =>
                    prev.map(v =>
                        v._id === vacation._id
                            ? {
                                ...v,
                                isLikedByMe: false,
                                likesCount: (v.likesCount ?? 1) - 1
                            }
                            : v
                    )
                );

            } else {

                await vacationService.likeVacation(vacation._id);

                setVacations(prev =>
                    prev.map(v =>
                        v._id === vacation._id
                            ? {
                                ...v,
                                isLikedByMe: true,
                                likesCount: (v.likesCount ?? 0) + 1
                            }
                            : v
                    )
                );

            }

        } catch (err) {
            notify.error(err);
        }
    }

    async function deleteVacation(_id: string) {
        try {

            if (!window.confirm("Delete this Vacation")) return;

            await vacationService.deleteVacation(_id);

            setVacations(prev => prev.filter(v => v._id !== _id));

        } catch (err) {
            notify.error(err);
        }
    }

    const now = new Date();

    const filteredVacations = vacations
        .filter(v => {

            const start = new Date(v.startDate);
            const end = new Date(v.endDate);

            if (filter === "active") return start <= now && end >= now;
            if (filter === "upcoming") return start > now;

            return true;

        })
        .filter(v => showOnlyLiked ? v.isLikedByMe : true);

    useEffect(() => {
        loadVacation(currentPage);
    }, [currentPage]);

    return (

        <div className="vacation-page">

            <div className="vacation-toolbar">

                {!isAdmin && (
                    <button
                        className={`filter-btn ${showOnlyLiked ? "active" : ""}`}
                        onClick={() => setShowOnlyLiked(prev => !prev)}
                    >
                        {showOnlyLiked ? "Show All Vacations" : "My Liked Vacations ❤️"}
                    </button>
                )}

                <button
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    className={`filter-btn ${filter === "active" ? "active" : ""}`}
                    onClick={() => setFilter("active")}
                >
                    Active
                </button>

                <button
                    className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
                    onClick={() => setFilter("upcoming")}
                >
                    Upcoming
                </button>

            </div>


            <div className="vacation-grid">

                {filteredVacations.map(vacation => (

                    <div key={vacation._id} className="vacation-card">

                        {isAdmin ? (
                            <>
                                <button
                                    className="edit-btn"
                                    onClick={() => navigate(`/vacation/edit/${vacation._id}`)}
                                >
                                    ✍🏻
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteVacation(vacation._id)}
                                >
                                    🗑️
                                </button>

                            </>
                        ) : (
                            <>
                                <button
                                    className={`btn-like ${vacation.isLikedByMe ? "likes" : ""}`}
                                    onClick={() => toggleLike(vacation)}
                                >
                                    <span className="heart">
                                        {vacation.isLikedByMe ? "❤️" : "🩶"}
                                    </span>

                                    <span className="like-count">
                                        {vacation.likesCount ?? 0}
                                    </span>
                                </button>
                                <div className="card-buttons">

                                    <button className="cardAI" data-tooltip="AI Recommendation"
                                        onClick={() => navigate(`/AIRecommend/${vacation._id}`)}>
                                        🤖
                                    </button>

                                    <button className="cardDetails" data-tooltip="View Details"
                                        onClick={() => navigate(`/vacation/${vacation._id}`)}>
                                       ℹ️
                                    </button>
                                    <button className="cardBook"  data-tooltip="Book Now"
                                    onClick={()=> navigate(`/booking/${vacation._id}`)}>
                                      🛫
                                    </button>

                                </div>
                            </>
                        )}


                        {/* <img src={`http://18.175.121.197:4001/images/${vacation.imageName}`} alt={vacation.destination} />
                         */}
                        <img src={imageBase + vacation.imageName} alt={vacation.destination} />
                        <h3>{vacation.destination}</h3>

                        <p>{vacation.description}</p>

                        <div className="date">
                            <span>{new Date(vacation.startDate).toLocaleDateString("en-GB")}</span>
                            <span>{new Date(vacation.endDate).toLocaleDateString("en-GB")}</span>
                        </div>

                        <div className="price">
                            ${vacation.price}
                        </div>

                    </div>

                ))}

            </div>


            <div className="pagination">

                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (

                    <button
                        key={page}
                        className={currentPage === page ? "active" : ""}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>

                ))}

                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    →
                </button>

            </div>

        </div>
    );
}