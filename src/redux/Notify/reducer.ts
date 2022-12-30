import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  LOCAL_STORAGE_NOTIFY } from './constant';
import { NotificationList, NotifyState } from './interface';

const initialState: NotifyState = {
    notificationList: JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTIFY) ?? '[]'),
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
    setNotificationList(state, action) {
      return {
        ...state,
        notificationList: action.payload,
      };
    },
    seenNotification(state, action: PayloadAction<number>) {
      const foundNotificationIndex = state.notificationList.findIndex(notify => notify.id === action.payload);
      if(foundNotificationIndex !== -1) {
        state.notificationList[foundNotificationIndex].isSeen = !Boolean(state.notificationList[foundNotificationIndex].isSeen);
        localStorage.setItem(LOCAL_STORAGE_NOTIFY, JSON.stringify(state.notificationList));
      }

      return state;
    },
    seenAllNotification(state) {
      state.notificationList = state.notificationList.map(value => ({...value, isSeen: true}));
      return state;
    },
    sortNotification(state) {
      const readNotificationList: NotificationList[] = [];
      const unReadNotificationList: NotificationList[] = [];
      state.notificationList.forEach(value => {
        if(value.isSeen) {
          readNotificationList.push({...value})
          return;
        };
        unReadNotificationList.push({...value});
      })
      state.notificationList = [...unReadNotificationList, ...readNotificationList];
      localStorage.setItem(LOCAL_STORAGE_NOTIFY, JSON.stringify(state.notificationList));
      return state;
    }
  },
});

export const { 
  unShiftNotificationList, 
  setNotificationList,
  seenNotification,
  sortNotification,
  seenAllNotification,
} = NotifySlice.actions;

export default NotifySlice.reducer;
