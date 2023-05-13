import IImage from './image.type';

export default interface IProduct {
  id: number;
  name: string;
  type?: string;
  description: string;
  price: number;
  mainImgLink: string;
  listImage: IImage[];
  coffee: boolean;
}
