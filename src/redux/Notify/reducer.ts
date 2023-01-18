import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  LOCAL_STORAGE_NOTIFY } from './constant';
import { NotificationList, NotifyState } from './interface';

const initialState: NotifyState = {
    notificationList: JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTIFY) ?? '[]'),
    unreadCount: 0,
}

const NotifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    unShiftNotificationList(state, action: PayloadAction<NotificationList>) {
      state.notificationList.unshift(action.payload);
      localStorage.setItem(LOCAL_STORAGE_NOTIFY, JSON.stringify(state.notificationList));
      return state;
    },
    setNotificationList(state, action: PayloadAction<NotificationList[]>) {
      state.notificationList = action.payload;
      localStorage.setItem(LOCAL_STORAGE_NOTIFY, JSON.stringify(state.notificationList));
      return state;
    },
    seenAllNotification(state) {
      state.notificationList = state.notificationList.map(value => ({...value, isSeen: true}));
      return state;
    },
  },
});

export const { 
  unShiftNotificationList, 
  setNotificationList,
  seenAllNotification,
} = NotifySlice.actions;

export default NotifySlice.reducer;
