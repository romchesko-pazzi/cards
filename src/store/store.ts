import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import { CardsReducer } from './reducers/CardsReducer';
import { PacksReducer } from './reducers/PacksReducer';
import { ProfileReducer } from './reducers/ProfileReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  packs: PacksReducer,
  cards: CardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
