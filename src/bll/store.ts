import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {AppReducer} from "./reducers/app-reducer";
import {ProfileReducer} from "./reducers/profile-reducer";
import {RegisterReducer} from "./reducers/register-reducer";
import {LoginReducer} from "./reducers/login-reducer";

export type RootStateType = ReturnType<typeof store.getState>;

export const rootReducer = combineReducers({
    app: AppReducer,
    profile: ProfileReducer,
    register: RegisterReducer,
    login: LoginReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk));