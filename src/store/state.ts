
import {IHomeState} from '../actions/Home/model'
import { IAuthState } from '../actions/Auth/model';
import { IMotorcycleState } from '../actions/Motorcycle/model';
export interface IApplicationState {
    home: IHomeState,
    auth: IAuthState,
    motorcycle: IMotorcycleState
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
