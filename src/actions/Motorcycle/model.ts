import { Action } from "redux";
import {MotorcycleActionTypes} from './actionType'

export interface IMotorcycleState {
    test: {
        num: number
    }
}

interface ITestAction extends Action<string> {
    type: MotorcycleActionTypes.TestAction;
}

export type ActionModel = ITestAction