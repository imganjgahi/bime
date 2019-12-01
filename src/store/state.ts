
import {IHomeState} from '../actions/Home/model'
import { IAuthState } from '../actions/Auth/model';
export interface IApplicationState {
    home: IHomeState,
    auth: IAuthState
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
