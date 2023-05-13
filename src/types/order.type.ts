import IPromotion from './promotion.type';
import IShopcartItem from './shopcartItem.type';

export default interface IOrder {
  fullName: string;
  phone: string;
  address: string;
  note: string;
  orderItems: IShopcartItem[];
  shippingFee?: number;
  promotionCode?: IPromotion;
  buyNow?: boolean;
}
