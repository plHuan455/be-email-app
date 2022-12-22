import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './constant';

const NotifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    unShiftNotificationList(state, action) {
      return {
        ...state,
        notificationList: [action.payload, ...state.notificationList],
      };
    },
    setNotificationList(state, action) {
      return {
        ...state,
        notificationList: action.payload,
      };
    },
  },
});

export const { unShiftNotificationList, setNotificationList } = NotifySlice.actions;

export default NotifySlice.reducer;
