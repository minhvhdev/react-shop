import { IProduct } from '@types';

import AxiosClient from './AxiosClient';

const productApi = {
  getAll: async function (): Promise<IProduct[]> {
    const url = '/products';
    return await AxiosClient.get(url);
  }
};
export default productApi;
