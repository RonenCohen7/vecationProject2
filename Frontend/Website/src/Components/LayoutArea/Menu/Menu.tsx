import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";

import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";

export function Menu() {

    const isLoggedIn = userService.isLogin();
    const navigate = useNavigate();

    function handleLogout() {
        userService.logout();
        notify.success("By By")
        navigate("/home");
    }


    return (
        <nav className="Navbar">
            <div className="logo"> 🌍 Vacation Live To Dream </div>
            <div className="nav-links">
                <NavLink to="/home">Home 🏠 </NavLink>

                {isLoggedIn && (<NavLink to="/vacations">Vacations  🌍  </NavLink>)}

                {!isLoggedIn && (<NavLink to="/login">Login</NavLink>)}

                {!isLoggedIn && (<NavLink to="/register">Register</NavLink>)}

                {userService.isAdmin() && (<NavLink to="/addVacation">Add Vacation</NavLink>)}
                 {userService.isAdmin() && (<NavLink to="/report/likes">Like Report</NavLink>)}

                {isLoggedIn && (<button onClick={handleLogout} className="logout-btn">Logout 🚪 </button>)}

            </div>

        </nav>
    );
}
