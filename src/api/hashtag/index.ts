import ApiClient from '@api/ApiClient';
import { AxiosResponse } from 'axios';

const HASHTAG_MAIN_API = '/user/hashtag';

const HASHTAG_API = {
  remove: `${HASHTAG_MAIN_API}/remove`,
  rename: `${HASHTAG_MAIN_API}/rename`,
};

const removeHashtag = async (params: {
  hashtag: string;
  subject: 'all' | 'only';
}): Promise<AxiosResponse<any>> => {
  const userId = Number(localStorage.getItem('current_id') ?? '0');

  const res = await ApiClient.post(HASHTAG_API.remove, undefined, {
    ...params,
    user_id: userId,
  });

  return res.data;
};

const updateHashtag = async (params: {
  current_hashtag: string;
  new_hashtag: string;
}): Promise<AxiosResponse<any>> => {
  const res = await ApiClient.put(HASHTAG_API.rename, undefined, {
    ...params,
    subject: 'all',
    user_email_id: 0,
  });

  return res.data;
};

export { removeHashtag, updateHashtag };
