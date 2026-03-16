import { useForm } from "react-hook-form";
import "./Login.css";
import { CredentialsModel } from "../../../../Models/CredentialsModel";

import { notify } from "../../../Utils/Notify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTitle } from "../../../Utils/UseTitle";
import { appConfig } from "../../../Utils/AppConfig";

export function Login() {
    useTitle("Login")


    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>()
    const navigate = useNavigate()

    function goRegister() {
        navigate("/register")
    }

    async function send(credentials: CredentialsModel) {
        try {
            const response = await axios.post(appConfig.loginUrl, credentials);
            const token = response.data
            localStorage.setItem("token", token)
            notify.success("Welcome back")


            navigate("/vacations");
            window.location.reload()
        } catch (err: any) {
            notify.error(err.response?.data || "Login failed");
        }
    }


    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <label>Email:</label>
                <input type="email" {...register("email", { required: "Email is required", maxLength: {value: 50, message: "Email too long"}, pattern: {value:/^\S+@\S+\.\S+$/,message: "Invalid email format"}  })} />
                {errors.email && <span>{errors.email.message}</span>}



                <label>Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 4, message: "Password Must be least 4 characters" },
                        maxLength: { value: 25, message: "Password too long" }
                        
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <button>Login</button>

                <h3>don't have account?</h3>
                <button onClick={goRegister}>Register Now</button>
            </form>
        </div>
    );
}
