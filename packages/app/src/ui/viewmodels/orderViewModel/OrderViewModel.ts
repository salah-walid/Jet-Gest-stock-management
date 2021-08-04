import { makeAutoObservable } from 'mobx';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';
import SearchParams from '../../../core/models/searchParams';
import UserData from '../../../core/models/UserData';
import ClientData from '../../../core/models/clientData'
import { OrderPageCombo } from '../../../core/models/orderData';

class OrderViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public orders : OrderPageCombo = {
        pageCount : 1,
        order : [],
    }

    public clients: ClientData[] = [];
    public chosenClient: string = "";
    
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
        this.getOrders();
        this.getPossibleSearchKeys();
        this.geClients();
        this.getSellers();
    }

    public async getPossibleSearchKeys() {
        this.possibleSearchKeys = await this._apiService?.getData<any>("gestion/getOrderPossibleSearchKeys") ?? this.possibleSearchKeys;

    }

    public async geClients() {
        this.clients = await this._apiService?.getData<ClientData[]>("gestion/getAllClients") ?? this.clients;
    }

    public async getSellers() {
        this.sellers = await this._apiService?.getData<UserData[]>("auth/userList", {"Authorization" : `TOKEN ${this._authService.token}`}) ?? this.sellers;
    }

    public async getOrders() {
        let orders: OrderPageCombo | null = null;
        if(!this.isSearching)
            orders = (await this._apiService
                    ?.postData<OrderPageCombo>(`gestion/getOrders/${this.currentPage}`, {"sellerId": this.chosenSeller, "clientId": this.chosenClient}))?.data
                    ?? this.orders;
        else{
            let search = Array.from<SearchParams, string>(this.search, (item) => {return item.key + "=" + item.value});
            orders = (await this._apiService
                    ?.postData<OrderPageCombo>(`gestion/searchOrders/${this.currentPage}`, {"search": search, "sellerId": this.chosenSeller, "clientId": this.chosenClient}))?.data
                    ?? this.orders;
        }
        if (orders.pageCount < this.orders.pageCount)
            this.currentPage = orders.pageCount;
        this.orders = orders;
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
            case "client":
                this.chosenClient = event.target.value;
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
        
        this.currentPage = 1;
        
        this.isSearching = this.search.length > 0;
        this.init();
    };

    public async deleteOrder(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette facture", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteOrder/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }
}

export default new OrderViewModel;
