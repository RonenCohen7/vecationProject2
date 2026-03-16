import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserModel {
    userId: string
    firstName: string
    lastName: string
    role: string
}

//Init user Reducer
function login(_currentState: UserModel | null, action: PayloadAction<UserModel>):UserModel {
    return action.payload
}

//Logout Reducer
function logout(): null {
    return null
}

//create slice
export const userSlice = createSlice({
    name: "userSlice",
    initialState: null as UserModel | null,
    reducers: { login, logout}
})