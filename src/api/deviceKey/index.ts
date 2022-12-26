import ApiClient from '@api/ApiClient';
import { async } from '@firebase/util';
import { AxiosResponse } from 'axios';
import { API_DEVICE_KEY } from './constant';
import { DeviceKeyResponse } from './interface';

const CURR_AUTH_ID: number = localStorage.getItem('current_id')
  ? Number(localStorage.getItem('current_id'))
  : 0;

// Post Device Key
export const postDeviceKey = async (
  deviceKey: string,
): Promise<AxiosResponse<DeviceKeyResponse>> => {
  const url = `${API_DEVICE_KEY}`;

  const res = await ApiClient.post(url, undefined, {
    user_id: CURR_AUTH_ID,
    device_key: deviceKey,
  });

  return res.data;
};

// Get Device Key
export const getDeviceKey = async (
  deviceKeyId?: number,
): Promise<AxiosResponse<DeviceKeyResponse>> => {
  const url = `${API_DEVICE_KEY}/${deviceKeyId}`;

  const res = await ApiClient.get(url);

  return res.data;
};

// Delete Device Key
export const deleteDeviceKey = async (): Promise<
  AxiosResponse<DeviceKeyResponse>
> => {
  const deviceKeyId = localStorage.getItem('device_key_id');

  const url = `${API_DEVICE_KEY}/${deviceKeyId}`;

  const res = await ApiClient.delete(url, undefined);

  return res.data;
};
