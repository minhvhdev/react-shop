import { IProduct, IResponse } from '@types';
import AxiosClient from './AxiosClient';

const productApi = {
  getAll: async function (): Promise<IProduct[]> {
    const url = '/product/getAll';
    return await AxiosClient.get(url);
  }
};
export default productApi;
