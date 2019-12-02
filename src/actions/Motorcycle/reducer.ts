import { Reducer } from "redux";
import { MotorcycleActionTypes } from "./actionType";
import { IMotorcycleState, ActionModel } from "./model";

const unloadedState: IMotorcycleState = {
    test: {
        num: 0
    }
};

export const MotorcycleReducer: Reducer<IMotorcycleState> = (
    state: IMotorcycleState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        case MotorcycleActionTypes.TestAction: {
            return {
                ...state,
                test: {
                    ...state.test,
                    num: state.test.num += 1,
                },
            } as IMotorcycleState;
        }
    }
    return state;
};
