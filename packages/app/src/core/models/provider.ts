export default interface ProviderData{
    id: number | null;
    name: string;
    lastName: string;
    adress: string;
    city: string;
    nMF: string;
    nRC: string;
    nAI: string;
}

export interface ProviderPageCombo{
    Providers: ProviderData[];
    pageCount: number;
}