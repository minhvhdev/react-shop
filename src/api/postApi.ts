import { IPost } from '@types';
import AxiosClient from './AxiosClient';

const postApi = {
  getAll: function (): Promise<IPost[]> {
    const url = '/post/getAll';
    return AxiosClient.get(url);
  }
};
export default postApi;
