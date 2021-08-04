import ProductOrderData from "./productOrderData";
import UserData from "./UserData";
import ClientData from './clientData'

export default interface OrderData{
    id?: number;
    seller? : UserData;
    client? : ClientData;
    orderNumber?: string;
    orderList: ProductOrderData[];
    creationDate?: Date;
    totalHT: number;
    tva: number;
    tvaAmount: number;
    totalTTC: number;
}

export interface OrderPageCombo{
    order: OrderData[];
    pageCount: number;
}