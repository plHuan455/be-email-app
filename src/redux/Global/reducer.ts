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
  defaultSignId: number;
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
  defaultSignId: 1,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeSidebarRight(state, action) {
      switch (action.payload) {
        case 'information':
          return {
            ...state,
            sidebarRight: {
              isShow: state.sidebarRight.isShow,
              title: 'Information',
              type: 'information',
            },
          };

        case 'notify':
          return {
            ...state,
            sidebarRight: {
              isShow: state.sidebarRight.isShow,
              title: 'Notify',
              type: 'notify',
            },
          };
        default:
          return {
            ...state,
            sidebarRight: {
              isShow: state.sidebarRight.isShow,
              title: 'Information',
              type: 'information',
            },
          };
      }
    },
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
    setDefaultSignId(state, action) {
      return { ...state, defaultSignId: action.payload };
    },
  },
});

export const {
  changeSidebarRight,
  setDefaultSignId,
  setThemeMode,
  setLocation,
  openInformationSidebarRight,
  openNotifySidebarRight,
  closeInformationSidebarRight,
  closeNotifySidebarRight,
} = globalSlice.actions;
export default globalSlice.reducer;
