import ApiClient from "@api/ApiClient";
import { NOTIFY_API } from "@constants/notifyAPI";
import { AxiosResponse } from "axios";
import { NotificationResponse, UpdateNotifyParams } from "./interface";

export const getNotifications = async (): Promise<AxiosResponse<NotificationResponse[]>> => {
  const url = NOTIFY_API;
  const res = await ApiClient.get(url);
  return res.data;
}

export const updateNotify = async (params: UpdateNotifyParams, id?: number) => {
  const url = `${NOTIFY_API}/${id ?? ''}`;
  const res = await ApiClient.put(url, undefined, params)
  return res.data;
}