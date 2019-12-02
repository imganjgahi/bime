import { HomeReducer } from "../actions/Home/reducer";
import { AuthReducer } from "../actions/Auth/reducer";
import { MotorcycleReducer } from "../actions/Motorcycle/reducer";

export const reducers = {
    home: HomeReducer,
    auth: AuthReducer,
    motorcycle: MotorcycleReducer
}