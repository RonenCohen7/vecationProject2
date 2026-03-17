import { useEffect, useRef, useState } from "react"
import { useTitle } from "../../../Utils/UseTitle"
import "./AiRecommend.css"
import { notify } from "../../../Utils/Notify"
import { vacationService } from "../../../Services/VacationService"
import { useNavigate, useParams } from "react-router-dom"



export function AIRecommend() {
    useTitle("Ai-Recommend")

    const { _id } = useParams();

    const [recommend, setRecommend] = useState<any>();
    const [loading, setLoading] = useState(false);
    const isLoadingRef = useRef(false);
    const navigate = useNavigate();

    async function loadRecommend() {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true
        setLoading(true)

        try {
            const result = await vacationService.getRecommend(_id as string);
            setRecommend(result.recommendation)

        } catch (err) {
            notify.error(err)
        }
        finally {
            isLoadingRef.current = false
            setLoading(false)
        }
    }

    useEffect(() => {
        loadRecommend();
    }, []);

    function goBack() {
        navigate("/vacations")

    }


    return (
        <div className="ai-recommend">

            {/* <button onClick={loadRecommend} disabled={loading}> */}
            {loading && <span className="spinner"></span>}
            {loading ? (
                <span className="ai-thinking">
                    Hi I'm your AI 🤖 Thinking... and bringing you recommendations
                </span>
            ) : (
                <span className="ai-done">
                    Recommendations found ✔
                </span>
            )}
            {/* </button> */}
            {recommend && (
                <div>
                    <h3>🏺 Cultural Places</h3>
                    <ul>
                        {recommend.cultural_places?.map((p: string) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                    <h3> 🥘 Local Food</h3>
                    {recommend.local_food?.map((f: string) => (
                        <li key={f}>{f}</li>
                    ))}
                    <h3>🛵 Adventure</h3>
                    {recommend.adventure_activities?.map((a: string) => (
                        <li key={a}>{a}</li>
                    ))}

                    <p>{recommend.summary}</p>
                    <div className="details-buttons">
                        <button onClick={goBack} className="btn-returnBack" data-tooltip="Back to Vacations">📃</button>
                    </div>

                </div>
            )}

        </div>
    )

}