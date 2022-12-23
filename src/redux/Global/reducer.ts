import { TLocation } from '@api/location';
import { createSlice } from '@reduxjs/toolkit';
import { boolean } from 'yup';
export interface GobalState {
  sidebarRight: {
    isShow: boolean;
    type: 'notify' | 'information';
    title: 'Notify' | 'Information';
  };
  themeMode: string;
  activeBar: string;
  locations: TLocation[];
}

const initialState: GobalState = {
  sidebarRight: {
    isShow: false,
    title: 'Information',
    type: 'information',
  },
  themeMode: 'dark',
  activeBar: 'home',
  locations: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    closeNotifySidebarRight(state) {
      return {
        ...state,
        sidebarRight: {
          isShow: false,
          title: 'Notify',
          type: 'notify',
        },
      };
    },
    openNotifySidebarRight(state) {
      return {
        ...state,
        sidebarRight: {
          isShow: true,
          title: 'Notify',
          type: 'notify',
        },
      };
    },
    closeInformationSidebarRight(state) {
      return {
        ...state,
        sidebarRight: {
          isShow: false,
          title: 'Information',
          type: 'information',
        },
      };
    },
    openInformationSidebarRight(state) {
      return {
        ...state,
        sidebarRight: {
          isShow: true,
          title: 'Information',
          type: 'information',
        },
      };
    },
    setThemeMode(state, action) {
      return { ...state, themeMode: action.payload };
    },
    setLocation(state, action) {
      return { ...state, locations: action.payload };
    },
  },
});

export const {
  setThemeMode,
  setLocation,
  openInformationSidebarRight,
  openNotifySidebarRight,
  closeInformationSidebarRight,
  closeNotifySidebarRight,
} = globalSlice.actions;
export default globalSlice.reducer;
