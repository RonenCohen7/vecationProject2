import { useEffect, useState } from "react"
import "./VacationWeather.css"
import { DayForecast, weather } from "@vacation/weather"



type Props = {
    destination: string;
    days: number;
    startDate: string;
    endDate: string;
}


export function VacationWeather({ destination, days, startDate, endDate }: Props) {

    const [forecast, setForecast] = useState<DayForecast[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
   
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        console.log("API KEY:", apiKey);
        weather.getForecast(destination, apiKey, days + 2)
            .then(data => {
                
                const filtered = data.filter(day => {
                    return day.date >= startDate && day.date <= endDate
                });
                setForecast(filtered)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [destination , days, startDate, endDate]);

    if (loading) return <p className="weather-loading">Loading weather...</p>
    return (
        <div className="VacationWeather">
            <h4 className="weather-title">Weather Forecast...</h4>
            <div className="weather-grid">
                {forecast.map(day => (
                    <div key={day.date} className="weather-card">
                        <p className="weather-date">
                            {new Date(day.date).toLocaleString("en", { weekday: "short", month: "short", day: "numeric" })}
                        </p>
                        <img src={day.icon} alt={day.condition} />
                        <p className="weather-condition">{day.condition}</p>
                        <div className="weather-temp">
                            <span className="temp-max">{day.maxTemp}°</span>
                            <span className="temp-min">{day.minTemp}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )




}