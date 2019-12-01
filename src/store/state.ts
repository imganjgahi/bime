
import {IHomeState} from '../actions/Home/model'
export interface IApplicationState {
    home: IHomeState
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
