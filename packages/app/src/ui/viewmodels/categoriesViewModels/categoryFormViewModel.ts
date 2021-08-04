import { makeAutoObservable} from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";
import ProductData, { productToFormData } from "../../../core/models/ProductData";

import placeHolder from "../../../assets/images/placeholder.png";
import ApiService, { ApiServiceSingleton } from "../../../core/services/ApiService";
import Routes from "../../../core/managers/routes";
import autoBind from "auto-bind";
import Category, { categoryToFormData, CatSubCatCombo } from "../../../core/models/Category";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import FormType from "../../../core/models/formType";
import DialogService, { DialogServiceSingelton } from "../../../core/services/DialogService";


export default class CategoryFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public category: Category= {
        id : null,
        title: "",
        image: placeHolder,
        subCategories: []
    };
    public file: File | null = null;
    public updateImage : boolean = false;
    public formType: FormType = FormType.new;
    public catsAndSubs: CatSubCatCombo = {
        categories:  [],
        subCategory: [],
    };

    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }

    public async initCategories() {
        this.catsAndSubs= await this._apiService?.getData<CatSubCatCombo>("gestion/getCatSubCatCombo") ?? this.catsAndSubs;
    }

    public async init(catId?: string) {
        if(catId){
            this.formType = FormType.update;

            let temp = await this._apiService?.getData<Category>(`gestion/getCategory/${catId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.category = temp;
            
        }else{
            this.formType = FormType.new;
        }
        this.initCategories();
    }

    public fileChanged(files: FileList | null) {
        if(files != null){
            this.file = files[0];
            this.category.image = URL.createObjectURL(this.file);
            this.updateImage = true;
        }
    }

    public inputChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        event.currentTarget.parentElement?.classList.add("was-validated");
    }

    public async submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(!this.formRef.current?.checkValidity()){
            
            this._dialogService.showDialog("Client", "Veuillez renseigner tout les champs correctement");
            return;
        }
        
        let copy = Object.assign({}, this.category)
        copy.image = this.file

        let formData = categoryToFormData(copy, copy.image !== null && this.updateImage);

        if(this.formType === FormType.new){

            let response = await this._apiService.postData<string>("gestion/postCategory", formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Produit", `Produit ${copy.title} créé`);
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){
            
            let response = await this._apiService.putData<string>(`gestion/putCategory/${copy.id}`, formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Produit", `Produit ${copy.title} modifié`);
                Routes.navigator.goBack();
            }
        }

    }

    public catSubsChanged(event: ChangeEvent<HTMLSelectElement>){
        let values = Array.from(event.target.selectedOptions, option => +option.value);

        this.category.subCategories = [];
        values.map((elt) => {
            let element = this.catsAndSubs.subCategory.find((item) => item.id === elt);
            if(element)
                this.category.subCategories.push(element);
        });
            
    };

    public async deleteImg() {
        if((await this._dialogService.showDialog("Supprimer", "Voullez vous vraiment supprimer cette image", true)).confirmed){
            this.category.image = null;
            this.file = null;
        }
    }
}