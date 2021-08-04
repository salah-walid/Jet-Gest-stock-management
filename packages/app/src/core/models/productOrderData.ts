import ProductData from "./ProductData";

export default interface ProductOrderData{
    id?: number;
    quantity: number;
    unitPrice: number;
    price: number;
    product: ProductData
}