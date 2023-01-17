export interface NotificationResponse {
  id: number;
  user_id: number;
  sender: string;
  receiver: string;
  notify_type_id: number;
  content: {
      id: number;
      notify: string;
  };
  status: "unread" | "read";
  email_id: number;
  // email: {
  //     writer_id: 0,
  //     signature_id: 0,
  //     signature: {}
  // },
  image: string;
  seen_at: string;
  created_at: string
}

export interface UpdateNotifyParams {
  sender?: string,
  receiver?: string,
  notify_type_id?: number,
  status?: "read" | "unread",
  image?: string
}