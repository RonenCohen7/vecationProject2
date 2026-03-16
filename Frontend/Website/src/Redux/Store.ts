import { configureStore } from "@reduxjs/toolkit";
import { vacationSlice } from "./VacationSlice";
import { userSlice } from "./UserSlice";


export const store = configureStore({
    reducer:{
        vacations: vacationSlice.reducer,
        user: userSlice.reducer
       
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;