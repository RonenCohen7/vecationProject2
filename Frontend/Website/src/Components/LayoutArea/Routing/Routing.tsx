import { Navigate, Route, Routes } from "react-router-dom";


import { Home } from "../../PagesArea/Home/Home.js";
import { Page404 } from "../../PagesArea/Page404/Page404.js";

import { Login } from "../../UserArea/Login/Login";

import { useEffect, useState } from "react";
import { Register } from "../../UserArea/Register/Register";
import { AddVacation } from "../../VacationArea/AddVacation/AddVacation";
import { userService } from "../../../Services/UserService";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation";
import { ListVacation } from "../../VacationArea/VacationList/VacationList";
import { VacationDetails } from "../../VacationArea/VacationDetails/VacationDetails";
import { LikesReport } from "../../Reports/LikesReport/LikesReport.js";
import { AIRecommend } from "../../VacationArea/AiRecommend/AiRecommend.js";
import { Booking } from "../../VacationArea/BookingVacation/BookingVacation.js";


export function Routing() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={isLoggedIn ? <ListVacation /> : <Navigate to="/login" replace />} />
            <Route path="/vacation/:_id" element={isLoggedIn ? <VacationDetails /> : <Navigate to="/login" replace />} />
            <Route path="/AIRecommend/:_id" element={isLoggedIn ? <AIRecommend /> : <Navigate to="/login" replace />} />
            <Route path="/booking/:_id" element={isLoggedIn ? <Booking /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addVacation" element={userService.isAdmin() ? <AddVacation /> : <Navigate to="/login" replace />} />
            <Route path="/vacation/edit/:_id" element={userService.isAdmin() ?<EditVacation/>: <Navigate to="/login" replace />} />
            <Route path="/report/likes" element={userService.isAdmin() ?<LikesReport/> : <Navigate to="/login" replace />}/>

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
