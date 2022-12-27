import user, { UserState } from './User/reducer';
import global, { GobalState } from './Global/reducer';
import breadcrumbs, { BreadcrumbsState } from './Breadcrumbs/reducer';
import { combineReducers } from 'redux';
import email, { EmailState } from './Email/reducer';
import notify from './Notify/reducer';
import { NotifyState } from './Notify/interface';
import contact, { ContactState } from './Contact/reducer';

export interface RootReducer {
  user?: UserState;
  global?: GobalState;
  breadcrumbs?: BreadcrumbsState;
  email?: EmailState;
  notify?: NotifyState;
  contact?: ContactState;
}

const rootReducer = combineReducers({
  contact,
  user,
  global,
  breadcrumbs,
  email,
  notify,
});

export default rootReducer;
