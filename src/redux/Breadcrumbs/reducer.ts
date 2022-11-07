import { createSlice } from '@reduxjs/toolkit';
import { To } from 'react-router-dom';

export interface BreadcrumbsStateProps {
  to: To;
  displayName: string;
}

export interface BreadcrumbsState {
  breadcrumbs: BreadcrumbsStateProps[];
  current?: BreadcrumbsStateProps;
}

const initialState: BreadcrumbsState = {
  breadcrumbs: [],
  current: undefined,
};

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs(state, action) {
      return action.payload;
    },
    removeBreadcrumbs(state, action) {
      return action.payload;
    },
  },
});

export const { setBreadcrumbs, removeBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;
