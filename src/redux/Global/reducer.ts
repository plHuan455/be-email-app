import { TLocation } from '@api/location';
import { createSlice } from '@reduxjs/toolkit';
export interface GobalState {
  isShowEmailInfo: boolean;
  themeMode: string;
  activeBar: string;
  locations: TLocation[];
}

const initialState: GobalState = {
  isShowEmailInfo: false,
  themeMode: 'dark',
  activeBar: 'home',
  locations: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    navigateIsShowEmailInfo(state) {
      localStorage.setItem(
        'isShow_Email_Information_Bar',
        JSON.stringify(!state.isShowEmailInfo),
      );

      return {
        ...state,
        isShowEmailInfo: !state.isShowEmailInfo,
      };
    },
    setIsShowEmailInfo(state, action) {
      localStorage.setItem(
        'isShow_Email_Information_Bar',
        JSON.stringify(action.payload),
      );
      return { ...state, isShowEmailInfo: action.payload };
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
  setIsShowEmailInfo,
  navigateIsShowEmailInfo,
} = globalSlice.actions;
export default globalSlice.reducer;
