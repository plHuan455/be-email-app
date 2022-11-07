import { TLocation } from '@api/location';
import { createSlice } from '@reduxjs/toolkit';
export interface GobalState {
  themeMode: string;
  activeBar: string;
  locations: TLocation[];
}

const initialState: GobalState = {
  themeMode: 'dark',
  activeBar: 'home',
  locations: []
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setThemeMode(state, action) {
      return { ...state, themeMode: action.payload };
    },
    setLocation(state, action) {
      return { ...state, locations: action.payload }
    }
  },
});

export const { setThemeMode, setLocation } = globalSlice.actions;
export default globalSlice.reducer;
