import ProductData from "./ProductData";

export default interface Entries{
    id?: number;
    quantity: number;
    unitPrice: number;
    price: number;
    product: ProductData
}