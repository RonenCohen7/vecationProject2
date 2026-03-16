import axios, { type InternalAxiosRequestConfig } from "axios";

class Interceptor {

    public create(): void {
        console.log("Interceptor created ");
        axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
            
            const token = localStorage.getItem("token");
            
            if (token) {
                request.headers.Authorization = "Bearer " + token;
            }
            console.log("FINAL HEADERS:", request.headers);

            return request;

        });

    }

}

export const interceptor = new Interceptor();
