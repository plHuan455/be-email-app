import { RootState } from './configureStore';

export const getBreadCrumbs = (state: RootState) => state.breadcrumbs;
export const getDefaultSignId = (state: RootState) => state.global.defaultSignId;
