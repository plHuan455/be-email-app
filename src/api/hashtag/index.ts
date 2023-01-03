import ApiClient from '@api/ApiClient';
import { AxiosResponse } from 'axios';

const HASHTAG_MAIN_API = '/v1/api/user/hashtag';

const HASHTAG_API = {
  remove: `${HASHTAG_MAIN_API}/remove`,
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

export { removeHashtag };
