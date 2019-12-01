import { Action } from "redux";
import {HomeActionTypes} from './actionType'

export interface IHomeState {
    test: {
        num: number
    }
}

interface ITestAction extends Action<string> {
    type: HomeActionTypes.TestAction;
}

export type ActionModel = ITestAction