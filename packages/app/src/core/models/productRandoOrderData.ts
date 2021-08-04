import ProductData from "./ProductData";

export default interface ProductRandoOrderData{
    id?: number;
    quantity: number;
    unitPrice: number;
    price: number;
    product: ProductData
}