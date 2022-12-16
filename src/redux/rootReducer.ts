import user, { UserState } from './User/reducer';
import global, { GobalState } from './Global/reducer';
import breadcrumbs, { BreadcrumbsState } from './Breadcrumbs/reducer';
import { combineReducers } from 'redux';
import email, { EmailState } from './Email/reducer';
import notify from './Notify/reducer';
import { NotifyState } from './Notify/interface';

export interface RootReducer {
  user?: UserState;
  global?: GobalState;
  breadcrumbs?: BreadcrumbsState;
  email?: EmailState;
  notify?: NotifyState;
}

const rootReducer = combineReducers({
  user,
  global,
  breadcrumbs,
  email,
  notify,
});

export default rootReducer;
