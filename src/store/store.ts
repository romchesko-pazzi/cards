import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import { ProfileReducer } from './reducers/ProfileReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
