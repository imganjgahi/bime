import { AppAction } from "../../store/state";
import { HomeActionTypes } from "./actionType";
import { ActionModel } from "./model";
import {HomeApi} from './api'

export const HomeActions = {
    testAction: (): AppAction<ActionModel> => async (dispatch, getState) => {
        try {
            const res = await HomeApi.testApi()
            console.log(res.status, " / ", res.data) 
            dispatch({ type: HomeActionTypes.TestAction  });
        } catch (error) {
            console.log("Massege: ", error.message)
        }

    },
};
