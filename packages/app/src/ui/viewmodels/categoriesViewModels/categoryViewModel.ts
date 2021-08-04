import { makeAutoObservable } from 'mobx';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';
import { CategoryPageCombo } from '../../../core/models/Category';

class ClientViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public categories : CategoryPageCombo = {
        pageCount : 1,
        categories : [],
    };

    public currentPage : number = 1;

    public search: string = "";

    constructor(){
        
        makeAutoObservable(this);

        autoBind(this);
              
    }

    init(){
        this.getCategories();
    }


    public async getCategories() {
        
        let categorie: CategoryPageCombo | null = null;
        categorie = (await this._apiService
            ?.postData<CategoryPageCombo>(`gestion/listCategories/${this.currentPage}`, {"search": this.search}))?.data
            ?? this.categories;
        
        if (categorie.pageCount < this.categories.pageCount)
            this.currentPage = categorie.pageCount;
        this.categories = categorie;
    }

    public setPage(page: number) : void{
        this.currentPage = page;
        this.init();
    }

    public researchChanged(event: ChangeEvent<HTMLInputElement>) {
        this.search = event.target.value;
    }

    public submited(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        this.init();

        this.currentPage = 1;
    };

    public async deleteCategory(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette catégorie", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteCategory/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }

    public async deleteSubCategory(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette sous catégorie", true)).confirmed){
            return;
        }

        this._apiService.deleteData(`gestion/deleteSubCategory/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
    }
}

export default new ClientViewModel;
