import ApiClient from "@api/ApiClient";
import { TEMPLATE_API } from "@constants/templateAPI";
import { AxiosResponse } from "axios";
import { CreateTemplateParams, ITemplateResponse, UpdateTemplateParams } from "./interface";

export const createTemplateService = async (params: CreateTemplateParams) => {
  const url = TEMPLATE_API;
  const res = await ApiClient.post(url, undefined, params)
  return res.data;
}

export const getTemplateListService = async (): Promise<AxiosResponse<ITemplateResponse[]>> => {
  const url = TEMPLATE_API;
  const res = await ApiClient.get(url);
  return res.data;
}

export const getTemplateService = async (id: number): Promise<AxiosResponse<ITemplateResponse>> => {
  const url = `${TEMPLATE_API}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
}

export const updateTemplateService = async (id: number, params: UpdateTemplateParams) => {
  const url = `${TEMPLATE_API}/${id}`;
  const res = await ApiClient.put(url, undefined, params);
  return res.data;
}

export const deleteTemplate = async (id: number) => {
  const url = `${TEMPLATE_API}/${id}`;
  const res = await ApiClient.delete(url, undefined);
  return res.data;
}