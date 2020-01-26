import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import rootSaga from "./sagas/saga";
import createSagaMiddleware from "redux-saga";
import { userReducer, UserState } from "./states/user";

export type AppState = {
  user: UserState;
};
const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers<AppState>({
    user: userReducer
  }),
  storeEnhancers(applyMiddleware(sagaMiddleware))
);
// sagaMiddleware.run(rootSaga);
export default store;
