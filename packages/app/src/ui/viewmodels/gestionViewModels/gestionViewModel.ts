import { makeAutoObservable } from 'mobx';
import {ProductPageCountCombo} from '../../../core/models/ProductData'
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import { ChangeEvent, FormEvent } from 'react';
import Category from '../../../core/models/Category';
import autoBind from 'auto-bind';
import AuthentificationService, {AuthentificationServiceSingleton} from '../../../core/services/authentificationService';
import HttpStatusCode from '../../../core/models/httpResponseStatus';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';


class GestionViewModel{
    
    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public products : ProductPageCountCombo = {
        pageCount : 1,
        products : [],
    }

    public currentPage : number = 1;

    public search : string = "";
    public isSearching : boolean = false;

    public categoriesList: Category[] = [];

    public selectedCategory: string = "";
    public selectedSubCategory: string = "";

    constructor(){
        
        makeAutoObservable(this);

        autoBind(this);
              
    }

    init(){
        this.getProducts();
        this.getCategories();
    }

    public async getCategories() {
        this.categoriesList = await this._apiService?.getData<Category[]>("gestion/getCategories") ?? this.categoriesList;
    }

    public async getProducts() {
        let products: ProductPageCountCombo | null = null;
        if(!this.isSearching)
            products = (await this._apiService
                ?.postData<ProductPageCountCombo>(`gestion/getProducts/${this.currentPage}`, {"catId": this.selectedCategory, "subCatId": this.selectedSubCategory}))?.data
                ?? this.products;
        else
            products = (await this._apiService
                ?.postData<ProductPageCountCombo>(`gestion/searchProducts/${this.currentPage}`, {"search": this.search, "catId": this.selectedCategory, "subCatId": this.selectedSubCategory}))?.data
                ?? this.products;
        
        if (products.pageCount < this.products.pageCount)
            this.currentPage = products.pageCount;
        this.products = products;
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
        
        this.currentPage = 1;
        
        this.isSearching = this.search !== "";
        this.init();
    };

    public dropDownChanged(event: ChangeEvent<HTMLSelectElement>){
        switch (event.target.name) {
            case "categories":
                this.selectedCategory = event.target.value;
                this.selectedSubCategory = "";
                break;

            case "subCategory":
                this.selectedSubCategory = event.target.value;
                break;
        
            default:
                break;
        }
        this.currentPage = 1;
        this.init();
    };

    public async deleteProduct(id: number | null | undefined) {

        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette article", true)).confirmed){
            return;
        }

        let response = await this._apiService.deleteData(`gestion/deleteProduct/${id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
        if (response?.status === HttpStatusCode.OK){
            this.init();
        }
    }
}

export default new GestionViewModel;
