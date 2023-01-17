export interface NotificationList {
  id: number;
  body: string;
  title: string;
  createdAt: string;
  isSeen?: boolean;
}

export interface NotifyState {
  notificationList: NotificationList[];
  unreadCount: number;
}
