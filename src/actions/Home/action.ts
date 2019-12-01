import { AppAction } from "../../store/state";
import { HomeActionTypes } from "./actionType";
import { ActionModel } from "./model";

export const HomeActions = {
    testAction: (): AppAction<ActionModel> => (dispatch, getState) => {
        dispatch({ type: HomeActionTypes.TestAction  });
    },
};
