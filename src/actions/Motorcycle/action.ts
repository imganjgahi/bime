import { AppAction } from "../../store/state";
import { MotorcycleActionTypes } from "./actionType";
import { ActionModel } from "./model";
import {MotorCycleApi} from './api'

export const MotorCycleActions = {
    testAction: (): AppAction<ActionModel> => async (dispatch, getState) => {
        try {
            const res = await MotorCycleApi.testApi()
            console.log(res.status, " / ", res.data) 
            dispatch({ type: MotorcycleActionTypes.TestAction  });
        } catch (error) {
            console.log("Massege: ", error.message)
        }

    },
};
