//import { combineReducers } from "redux";
import { combineReducers } from "redux";

const apiReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'SET_API_AUTH':
            return { ...state, ...action.payload }
        case 'API_RESET':
            return state = []
        default:
            return state
    }
}

const accountListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            return { ...state, ...action.payload }
        case 'ACCOUNTS_RESET':
            return state = []
        default:
            return state
    }
}

const categoryListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return { ...state, ...action.payload }
        case 'CATEGORIES_RESET':
            return state = []
        default:
            return state
    }
}

const transactionListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return { ...state, ...action.payload }
        case 'TRANSACTIONS_RESET':
            return state = []
        default:
            return state
    }
}



const appReducer = combineReducers({ apiReducer,accountListReducer,categoryListReducer,transactionListReducer });

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer