import { makeAutoObservable } from 'mobx';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';
import SearchParams from '../../../core/models/searchParams';
import ProviderData from '../../../core/models/provider';
import { ProviderOrderPageCombo } from '../../../core/models/providerOrder';
import UserData from '../../../core/models/UserData';

class ProviderOrderViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public providersOrders : ProviderOrderPageCombo = {
        pageCount : 1,
        providerOrders : [],
    }

    public providers: ProviderData[] = [];
    public chosenProvider: string = "";
    
    public sellers: UserData[] = [];
    public chosenSeller: string = "";

    public currentPage : number = 1;

    public search: SearchParams[] = [];
    public isSearching : boolean = false;

    public possibleSearchKeys: any = {};

    constructor(){
        
        makeAutoObservable(this);

        autoBind(this);
              
    }

    init(){
        this.getProviderOrders();
        this.getPossibleSearchKeys();
        this.getProvider();
        this.getSellers();
    }

    public async getPossibleSearchKeys() {
        this.possibleSearchKeys = await this._apiService?.getData<any>("gestion/getProviderOrderPossibleSearchKeys") ?? this.possibleSearchKeys;

    }

    public async getProvider() {
        this.providers = await this._apiService?.getData<ProviderData[]>("gestion/getAllProviders") ?? this.providers;
    }

    public async getSellers() {
        this.sellers = await this._apiService?.getData<UserData[]>("auth/userList", {"Authorization" : `TOKEN ${this._authService.token}`}) ?? this.sellers;
    }

    public async getProviderOrders() {
        let providers: ProviderOrderPageCombo | null = null;
        if(!this.isSearching)
            providers = (await this._apiService
                    ?.postData<ProviderOrderPageCombo>(`gestion/getProviderOrders/${this.currentPage}`, {"sellerId": this.chosenSeller, "providerId": this.chosenProvider}))?.data
                    ?? this.providersOrders;
        else{
            let search = Array.from<SearchParams, string>(this.search, (item) => {return item.key + "=" + item.value});
            providers = (await this._apiService
                    ?.postData<ProviderOrderPageCombo>(`gestion/searchProviderOrders/${this.currentPage}`, {"search": search, "sellerId": this.chosenSeller, "providerId": this.chosenProvider}))?.data
                    ?? this.providersOrders;
        }
        if (providers.pageCount < this.providersOrders.pageCount)
            this.currentPage = providers.pageCount;
        this.providersOrders = providers;
    }

    public setPage(page: number) : void{
        this.currentPage = page;
        this.init();
    }

    public researchChanged(event: ChangeEvent<HTMLInputElement>) {
        let key = event.target.name;
        let value = event.target.value;

        const index = this.search.findIndex((item) => item.key === key);
        if(!value && index !== -1){
            this.search.splice(index, 1);
        }else if(value && index !== -1){
            this.search[index].value = value;
        }else{
            this.search.push({key: key, value: value});
        }
    }

    public dropDownChanged(event: ChangeEvent<HTMLSelectElement>){
        switch (event.target.name) {
            case "provider":
                this.chosenProvider = event.target.value;
                break;

            case "seller":
                this.chosenSeller = event.target.value;
                break;
        
            default:
                break;
        }
        this.currentPage = 1;
        this.init();
    };

    public submited(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(this.search.length);
        
        this.currentPage = 1;
        
        this.isSearching = this.search.length > 0;
        this.init();
    };

    public async deleteProviderOrder(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette pièce fournisseur", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteProviderOrder/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }
}

export default new ProviderOrderViewModel;
