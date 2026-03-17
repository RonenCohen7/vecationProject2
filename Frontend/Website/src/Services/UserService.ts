
import axios from "axios"
import { CredentialsModel } from "../../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";
import { RegisterModel } from "../../Models/RegisterModel";
import { jwtDecode } from "jwt-decode";
import { notify } from "../Utils/Notify";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";




class UserService {

    //Login
    public async login(credential: CredentialsModel): Promise<void> {
        try {
            const response = await axios.post<string>(appConfig.loginUrl, credential)

            const token = response.data
            localStorage.setItem("token", token)

            const payload: any = jwtDecode(token)
            console.log("JWT payload:", payload);
            store.dispatch(userSlice.actions.login({
                userId: payload.userId,
                firstName:payload.firstName,
                lastName:payload.lastName,
                role: payload.role
            }))
            
        } catch (err: any) {

            let message = err.response?.data || "Login failed";

            if (typeof message === "string" && message.includes(":")) {
                message = message.split(":").pop()?.trim();
            }

            notify.error(message);
        }



    }
    //Register
    public async Register(user: RegisterModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user)
        const token = response.data;
        localStorage.setItem("token", token)
        const payload: any = jwtDecode(token)
        store.dispatch(userSlice.actions.login({
            userId: payload.userId,
            firstName: payload.firstName,
            lastName:payload.lastName,
            role: payload.role
        }))

    }

    //Logout
    public logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        store.dispatch(userSlice.actions.logout())
       
    }

    //Check if user login
    public isLogin(): boolean {
        return !!localStorage.getItem("token")
    }


    //Get Role
    public getRole(): string | null {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const payload: any = jwtDecode(token)
        return payload.role
    }

    //is Admin
    public isAdmin(): boolean {
        return this.getRole() === "admin"
    }

    //Get User Name
    public getFullName(): string | null {
        const token = localStorage.getItem("token")
        if (!token) return null
        const payload: any = jwtDecode(token)
        if (!payload.firstName || !payload.lastName) return null
        return `${payload.firstName} ${payload.lastName}`;
    }

    //Get User Id
    public getUser(): {userId: string, role: string, firstName:string, lastName:string} | null {
        const token = localStorage.getItem("token")
        if(!token) return null;
        return jwtDecode(token) as any;
    }


    //load user from token
    public loadUserFromToken():void {
        const token = localStorage.getItem("token");
        if(!token) return;

        const payload: any = jwtDecode(token)
        store.dispatch(userSlice.actions.login({
            userId: payload.userId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            role: payload.role
        }))
    }


}


export const userService = new UserService();