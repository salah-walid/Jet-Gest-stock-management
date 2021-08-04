import ProductRandoOrderData from "./productRandoOrderData";
import UserData from "./UserData";

export default interface OrderRandoData{
    id?: number;
    seller? : UserData;
    client : string;
    orderNumber?: string;
    orderList: ProductRandoOrderData[];
    creationDate?: Date;
    total: number;
}

export interface OrderRandoPageCombo{
    order: OrderRandoData[];
    pageCount: number;
}