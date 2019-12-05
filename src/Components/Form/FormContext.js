import React, { createContext, useReducer } from 'react'
const CHILD_CHANGE_HANDLER = "CHILD_CHANGE_HANDLER";
const SET_STATE_VALUE = "SET_STATE_VALUE";

export const FormContext = createContext()
const initialState = {
    iscreated: true
}
const reducer = (state, action) => {

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
}
export const FormState = (props) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)


    // const setStateValues = (name, itemRules) => {
    //     let data = {}
    //     let err = {}
    //     let rules = {}
    //     rules[name] = itemRules
    //     data[name] = ""
    //     err[name] = { msg: "", isValid: false }
    //    return dispatch({
    //         type: SET_STATE_VALUE,
    //         data,
    //         err,
    //         rules,
    //         iscreated: true
    //     })
    // }

    return <FormContext.Provider value={initialState}>
        {props.children}
    </FormContext.Provider>
}




