import ApiClient from "@api/ApiClient";
import { CONTACT_API } from "@constants/contactAPI"
import { AxiosResponse } from "axios";
import { ContactCreateParams, ContactResponse, EditContactParams } from "./interface";

export const getContactsService = async (): Promise<AxiosResponse<ContactResponse[]>> => {
  const url = CONTACT_API;
  const res = await ApiClient.get(url);
  return res.data;
}

export const getContactService = async (id: number): Promise<AxiosResponse<ContactResponse>> => {
  const url = `${CONTACT_API}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
}

export const createContact = async (params: ContactCreateParams) => {
  const url = CONTACT_API;
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
}

export const updateContactService = async (params: EditContactParams) => {
  const url = CONTACT_API;
  const res = await ApiClient.put(url, undefined, params);
  return res.data;
}