import Entries from "./entries";
import ProviderData from "./provider";
import UserData from "./UserData";

export default interface ProviderOrder{
    id: number | null;
    orderNumber?: string;
    seller?: UserData;
    provider? : ProviderData;
    orderList: Entries[];
    creationDate?: string;
    total: number;
}

export interface ProviderOrderPageCombo{
    providerOrders: ProviderOrder[];
    pageCount: number;
}