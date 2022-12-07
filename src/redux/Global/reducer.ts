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
    setIsShowEmailInfo(state, action) {
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

export const { setThemeMode, setLocation, setIsShowEmailInfo } = globalSlice.actions;
export default globalSlice.reducer;
