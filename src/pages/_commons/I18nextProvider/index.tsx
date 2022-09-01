import React, { ReactNode, useEffect } from 'react';
import I18nextProvider from 'app/components/I18next';
import { useDispatch, useSelector } from 'react-redux';
import { i18nextActions } from './_redux/reducers';
import { IResource } from './types';
import { selectedResource } from './_redux/selectors';

const I18next: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const resource: IResource = useSelector(selectedResource);

  useEffect(() => {
    dispatch(i18nextActions.getTranslateData({}));
  }, [dispatch]);

  return <I18nextProvider resource={resource}>{children}</I18nextProvider>;
};

export default I18next;
