import { makeAutoObservable } from 'mobx';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';
import { ClientPageCombo } from '../../../core/models/clientData';
import SearchParams from '../../../core/models/searchParams';

class ClientViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public clients : ClientPageCombo = {
        pageCount : 1,
        Clients : [],
    }

    public currentPage : number = 1;

    public search: SearchParams[] = [];
    public isSearching : boolean = false;

    public possibleSearchKeys: any = {};

    constructor(){
        
        makeAutoObservable(this);

        autoBind(this);
              
    }

    init(){
        this.getClients();
        this.getPossibleSearchKeys();
    }

    public async getPossibleSearchKeys() {
        this.possibleSearchKeys = await this._apiService?.getData<any>("gestion/getClientPossibleSearchKeys") ?? this.possibleSearchKeys;

    }

    public async getClients() {
        let clients: ClientPageCombo | null = null;
        if(!this.isSearching)
            clients = (await this._apiService
                    ?.postData<ClientPageCombo>(`gestion/getClients/${this.currentPage}`, {}))?.data
                    ?? this.clients;
        else{
            let search = Array.from<SearchParams, string>(this.search, (item) => {return item.key + "=" + item.value});
            clients = (await this._apiService
                    ?.postData<ClientPageCombo>(`gestion/searchClients/${this.currentPage}`, {"search": search}))?.data
                    ?? this.clients;
        }
        if (clients.pageCount < this.clients.pageCount)
            this.currentPage = clients.pageCount;
        this.clients = clients;
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

    public submited(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(this.search.length);
        
        this.currentPage = 1;
        
        this.isSearching = this.search.length > 0;
        this.init();
    };

    public async deleteClient(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer ce client", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteClient/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }
}

export default new ClientViewModel;
