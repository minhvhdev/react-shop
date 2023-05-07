import IProduct from "./product.type";

export default interface IShopcart{
    id: number;
    product: IProduct;
    quantity: number;
}