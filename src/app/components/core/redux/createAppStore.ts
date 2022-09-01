import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  ReducersMapObject,
  Store
} from 'redux';
import { AppState } from 'storeConfigs';
import dynamicMiddleware from './dynamicMiddleware';

export function createReducer(
  customReducers?: ReducersMapObject<any, AnyAction>
): Reducer {
  return combineReducers<AppState, AnyAction>(customReducers || {});
}

export function createAppStore(): Store {
  return createStore<any, AnyAction, unknown, unknown>(
    createReducer(),
    applyMiddleware(dynamicMiddleware.enhancer)
  );
}

export function addReducersToStore(
  appStore: Store,
  reducers?: ReducersMapObject<any, AnyAction>
) {
  reducers && appStore.replaceReducer(createReducer(reducers));
}

const store = createAppStore();

export default store;
