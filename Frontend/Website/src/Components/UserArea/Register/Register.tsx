import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form"
import { notify } from "../../../Utils/Notify";

import { RegisterModel } from "../../../../Models/RegisterModel";
import { useTitle } from "../../../Utils/UseTitle";
import { userService } from "../../../Services/UserService";




export function Register() {
    useTitle("Register")

    const { register, handleSubmit, formState: {errors} } = useForm<RegisterModel>()
    const navigate = useNavigate()

    function goLogin() {
        navigate("/login")
    }

    async function send(user: RegisterModel) {
        try {
            await userService.Register(user);
            notify.success("Account Created 🎉")
            navigate("/vacations")
            window.location.reload()

        } catch (err: any) {
            notify.error(err);

        }
    }


    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)}>
                <h2>Create Account</h2>
                <label>First Name</label>
                {errors.firstName && <span>{errors.firstName.message}</span>}
                <input {...register("firstName", {
                    required: "First Name is required",
                    minLength: { value: 2, message: "First Name Must be  a least 2 characters" },
                    maxLength: { value: 50, message: "First Name max 50 Character" }
                    
                })} />

                <label>Last Name</label>
                {errors.lastName && <span>{errors.lastName.message}</span>}
                <input {...register("lastName", {
                    required: "Last Name is required",
                    minLength: { value: 2, message: "Last Name Must be  a least 2 characters" },
                    maxLength: { value: 50, message: "Last Name max 50 Character" }
                })} />
                <label>Email</label>
                <input type="email" {...register("email", { required: "Email is required", maxLength: { value: 50, message: "Email too long" }, pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })} />
                 {errors.email && <span>{errors.email.message}</span>}

                <label>Password</label>
                {errors.password && <span>{errors.password.message}</span>}
                <input type="password"{...register("password", {
                    required: "Password is required",
                    minLength: { value: 4, message: "Password Must be least 4 characters" },
                    maxLength: { value: 25, message: "Password too long" }
                })} />
                
                <button>Create Account</button>
                <button onClick={goLogin}>Already have Account - login</button>

            </form>
        </div>
    );
}
