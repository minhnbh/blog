import { combineReducers } from 'redux';
import { reducer as i18next } from 'pages/_commons/I18nextProvider/_redux/reducers';
import { reducer as toast } from 'pages/_commons/Toast/_redux';
import { reducer as confirmModal } from 'pages/_commons/ConfirmModal/_redux';

export const reducerMappingList = {
  i18next,
  toast,
  confirmModal
};

export const rootReducer = combineReducers(reducerMappingList);
export type AppState = ReturnType<typeof rootReducer>;
