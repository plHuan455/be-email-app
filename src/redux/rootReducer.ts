import user, { UserState } from './User/reducer';
import global, { GobalState } from './Global/reducer';
import breadcrumbs, { BreadcrumbsState } from './Breadcrumbs/reducer';
import { combineReducers } from 'redux';

export interface RootReducer {
  user?: UserState;
  global?: GobalState;
  breadcrumbs?: BreadcrumbsState;
}

const rootReducer = combineReducers({
  user,
  global,
  breadcrumbs,
});

export default rootReducer;
