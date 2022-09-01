import React, { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from 'redux';
import store, { addReducersToStore } from './redux/createAppStore';
import dynamicMiddleware from './redux/dynamicMiddleware';

interface AppContextProps {
  customReducers: ReducersMapObject<any, any>;
  middleware?: any[];
  children?: ReactNode;
}

const AppContext: React.FC<AppContextProps> = ({
  customReducers,
  middleware,
  children
}) => {
  useMemo(() => addReducersToStore(store, customReducers), [customReducers]);
  useMemo(() => dynamicMiddleware.addMiddleware(middleware), [middleware]);

  return <Provider store={store}>{children}</Provider>;
};

export default AppContext;
