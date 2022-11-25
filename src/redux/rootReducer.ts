import user, { UserState } from './User/reducer';
import global, { GobalState } from './Global/reducer';
import breadcrumbs, { BreadcrumbsState } from './Breadcrumbs/reducer';
import { combineReducers } from 'redux';
import email, { EmailState } from './Email/reducer';

export interface RootReducer {
  user?: UserState;
  global?: GobalState;
  breadcrumbs?: BreadcrumbsState;
  email?: EmailState;
}

const rootReducer = combineReducers({
  user,
  global,
  breadcrumbs,
  email,
});

export default rootReducer;
