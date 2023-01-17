import ApiClient, { CuSAxiosResponse } from '@api/ApiClient';
import { SearchCatalogResponse, SearchCatalogUserResponse } from './interface';

const SEARCH_API = '/_search';

export const searchCatalog = async (params: {
  keyword: string;
  size?: number;
  ['es-index']?: string;
}): Promise<
  CuSAxiosResponse<SearchCatalogResponse[] | SearchCatalogUserResponse[]>
> => {
  const url = `${SEARCH_API}`;
  const res = await ApiClient.get(url, undefined, params);
  return res.data;
};
