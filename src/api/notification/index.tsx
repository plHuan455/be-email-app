import ApiClient from "@api/ApiClient";
import { NOTIFY_API, NOTIFY_API_USER } from "@constants/notifyAPI";
import { AxiosResponse } from "axios";
import { NotificationResponse, UpdateNotifyParams } from "./interface";

export const getNotifications = async (userId: number): Promise<AxiosResponse<NotificationResponse[]>> => {
  const url = `${NOTIFY_API_USER}/${userId}`;
  const res = await ApiClient.get(url);
  return res.data;
}

export const updateNotify = async (params: UpdateNotifyParams, id?: number) => {
  const url = `${NOTIFY_API}/${id ?? ''}`;
  const res = await ApiClient.put(url, undefined, params)
  return res.data;
}

export const readAllNotifyService = async (userId: number) => {
  const url = `${NOTIFY_API_USER}/${userId}`;
  const res = await ApiClient.put(url, undefined);
  return res
} 