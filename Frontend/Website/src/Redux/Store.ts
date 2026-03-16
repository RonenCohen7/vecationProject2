import { configureStore } from "@reduxjs/toolkit";
import { vacationSlice } from "./VacationSlice";


export const store = configureStore({
    reducer:{
        vacations: vacationSlice.reducer,
       
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;