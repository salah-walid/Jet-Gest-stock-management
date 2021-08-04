import { makeAutoObservable } from 'mobx';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';
import { ClientPageCombo } from '../../../core/models/clientData';
import SearchParams from '../../../core/models/searchParams';
import { ProviderPageCombo } from '../../../core/models/provider';

class ProviderViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public providers : ProviderPageCombo = {
        pageCount : 1,
        Providers : [],
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
        this.getProviders();
        this.getPossibleSearchKeys();
    }

    public async getPossibleSearchKeys() {
        this.possibleSearchKeys = await this._apiService?.getData<any>("gestion/getProviderPossibleSearchKeys") ?? this.possibleSearchKeys;

    }

    public async getProviders() {
        let providers: ProviderPageCombo | null = null;
        if(!this.isSearching)
            providers = (await this._apiService
                    ?.postData<ProviderPageCombo>(`gestion/getProviders/${this.currentPage}`, {}))?.data
                    ?? this.providers;
        else{
            let search = Array.from<SearchParams, string>(this.search, (item) => {return item.key + "=" + item.value});
            providers = (await this._apiService
                    ?.postData<ProviderPageCombo>(`gestion/searchProviders/${this.currentPage}`, {"search": search}))?.data
                    ?? this.providers;
        }
        if (providers.pageCount < this.providers.pageCount)
            this.currentPage = providers.pageCount;
        this.providers = providers;
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

    public async deleteProvider(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer ce fournisseur", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteProvider/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }
}

export default new ProviderViewModel;
