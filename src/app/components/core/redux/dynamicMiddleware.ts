import { AnyAction, compose, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';

const createDynamicMiddleware = () => {
  const dynamicAppMiddleware: Middleware[] = [];
  let store: Store;

  const enhancer = (_store: any) => {
    store = _store;

    return (next: unknown) => (action: AnyAction) => {
      return (compose(...dynamicAppMiddleware)(next) as any)(action);
    };
  };

  const addMiddleware = (middleware?: Middleware[]) => {
    let appMiddleware: Middleware[] | undefined = middleware;

    if (appMiddleware === undefined) {
      appMiddleware = [thunk];
    }

    if (process.env.NODE_ENV === 'development') {
      process.env.REACT_APP_REDUX_LOGGER &&
        appMiddleware.push(require('redux-logger').default);
    }

    dynamicAppMiddleware.push(
      ...(appMiddleware.map(item => item(store)) as any)
    );
  };

  return {
    addMiddleware,
    enhancer
  };
};

const dynamicMiddleware = createDynamicMiddleware();

export default dynamicMiddleware;
