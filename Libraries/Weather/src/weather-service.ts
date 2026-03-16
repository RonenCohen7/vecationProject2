import axios from "axios";
import { DayForecast } from "./weather-model";

const BASE_URL = "https://api.weatherapi.com/v1";

export const weather = {
    async getForecast(destination: string, apiKey: string, days:number = 5):Promise<DayForecast[]>{
        const result = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {key: apiKey, q: destination, days}
        });
        return result.data.forecast.forecastday.map((d:any) => ({
            date: d.date,
            maxTemp: Math.round(d.day.maxtemp_c),
            minTemp: Math.round(d.day.mintemp_c),
            condition: d.day.condition.text,
            icon: d.day.condition.icon
        }))
    }
    
}