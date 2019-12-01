import { Reducer } from "redux";
import { HomeActionTypes } from "./actionType";
import { IHomeState, ActionModel } from "./model";

const unloadedState: IHomeState = {
    test: {
        num: 0
    }
};

export const HomeReducer: Reducer<IHomeState> = (
    state: IHomeState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        case HomeActionTypes.TestAction: {
            return {
                ...state,
                test: {
                    ...state.test,
                    num: state.test.num += 1,
                },
            } as IHomeState;
        }
    }
    return state;
};
