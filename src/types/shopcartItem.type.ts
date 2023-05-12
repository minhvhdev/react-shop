import IProduct from './product.type';

export default interface IShopcartItem {
  id: number;
  product: IProduct;
  quantity: number;
  type?: 'Bột' | 'Hạt';
}
