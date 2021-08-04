export default interface ClientData{
    id: number | null;
    name: string;
    lastName: string;
    adress: string;
    city: string;
    nMF: string;
    nRC: string;
    nAI: string;
}

export interface ClientPageCombo{
    Clients: ClientData[];
    pageCount: number;
}