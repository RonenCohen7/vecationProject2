import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../../Models/VacationModel";


//Init entire Vacation Reducer 
function initVacation(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {

    //Extract entire vacation to init 
    const initialVacation: VacationModel[] = action.payload;

    //create the new state to return
    const newState: VacationModel[] = initialVacation;

    //return the new state
    return newState
}


//Add Vacation Reducer
function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState: VacationModel[] = [...currentState];
    const vacationToAdd: VacationModel = action.payload;
    newState.push(vacationToAdd);
    return newState;
}

//Update Vacation Reducer
function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState: VacationModel[] = [...currentState];
    const vacationToUpdate: VacationModel = action.payload;
    const index = newState.findIndex(v => v._id === vacationToUpdate._id);
    if (index >= 0) {
        newState[index] = vacationToUpdate;
    }
    return newState
}

//DELETE Vacation Reducer
function deleVacation(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    const newState: VacationModel[] = [...currentState];
    const vacationIdDelete: string = action.payload;
    const index = newState.findIndex(v => v._id === vacationIdDelete);
    if (index >= 0) {
        newState.splice(index, 1)
    }
    return newState;

}


// Toggle Like 
function toggleLike(
    currentState: VacationModel[],action: PayloadAction<{ id: string; isLikedByMe: boolean }>): VacationModel[] {
    return currentState.map((v:VacationModel) =>
        v._id === action.payload.id
            ? {
                ...v,
                isLikedByMe: action.payload.isLikedByMe,
                likesCount: action.payload.isLikedByMe
                    ? v.likesCount + 1
                    : v.likesCount - 1
            }
            : v
    );
}

    //Creating the Vacation slice:
    export const vacationSlice = createSlice({
        name: "vacationSlice",
        initialState: [] as VacationModel[],
        reducers: { initVacation, addVacation, updateVacation, deleVacation, toggleLike }
    })