import { IPost } from '@types';

import posts from '../../public/statics/data/posts.json';

const postApi = {
  getAll: function (): Promise<IPost[]> {
    // const url = '/posts';
    // return AxiosClient.get(url);
    return new Promise((res) => res(posts));
  }
};
export default postApi;
