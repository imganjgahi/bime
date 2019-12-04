import React, { createContext, useReducer } from 'react'
interface IState {
    [key: string]: any;
    iscreated: boolean;
}

const CHILD_CHANGE_HANDLER = "CHILD_CHANGE_HANDLER";
const SET_STATE_VALUE = "SET_STATE_VALUE";

export const FormContext = createContext<IState>({ iscreated: false })

export const FormState = (props: any) => {
    const initialState: IState = {
        iscreated: false
    }
    const [state, dispatch] = useReducer((state, action) => {

        switch (action.type) {
            case CHILD_CHANGE_HANDLER:
                return {
                    ...state,
                    iscreated: action.iscreated,
                    data: action.data,
                    err: action.err,
                    rules: action.rules
                }
            case CHILD_CHANGE_HANDLER:
                return {
                    ...state,
                    iscreated: true
                }
        }
        return state
    }, initialState)


    const setStateValues = (name: string, itemRules: object[]) => {
        let data: any = {}
        let err: any = {}
        let rules: any = {}
        rules[name] = itemRules
        data[name] = ""
        err[name] = { msg: "", isValid: false }
       return dispatch({
            type: SET_STATE_VALUE,
            data,
            err,
            rules,
            iscreated: true
        })
    }

    return <FormContext.Provider value={{ iscreated: state.iscreated }}>
        {props.children}
    </FormContext.Provider>
}




