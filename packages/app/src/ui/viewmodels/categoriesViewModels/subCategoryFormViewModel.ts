import { makeAutoObservable} from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";
import ProductData, { productToFormData } from "../../../core/models/ProductData";

import placeHolder from "../../../assets/images/placeholder.png";
import ApiService, { ApiServiceSingleton } from "../../../core/services/ApiService";
import Routes from "../../../core/managers/routes";
import autoBind from "auto-bind";
import { CatSubCatCombo } from "../../../core/models/Category";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import FormType from "../../../core/models/formType";
import DialogService, { DialogServiceSingelton } from "../../../core/services/DialogService";
import SubCategory, { subCategoryToFormData } from "../../../core/models/SubCategory";


export default class SubCategoryFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public subCategory: SubCategory= {
        id: null,
        image: placeHolder,
        title: "",
    };
    public file: File | null = null;
    public updateImage : boolean = false;
    public formType: FormType = FormType.new;

    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }

    public async init(subCatId?: string) {
        if(subCatId){
            this.formType = FormType.update;

            let temp = await this._apiService?.getData<SubCategory>(`gestion/getSubCategory/${subCatId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.subCategory = temp;
            
        }else{
            this.formType = FormType.new;
        }
    }

    public fileChanged(files: FileList | null) {
        if(files != null){
            this.file = files[0];
            this.subCategory.image = URL.createObjectURL(this.file);
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
        
        let copy = Object.assign({}, this.subCategory)
        copy.image = this.file

        let formData = subCategoryToFormData(copy, copy.image !== null && this.updateImage);        

        if(this.formType === FormType.new){

            let response = await this._apiService.postData<string>("gestion/postSubCategory", formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Produit", `Sous catégorie ${copy.title} créé`);
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){

            let response = await this._apiService.putData<string>(`gestion/putSubCategory/${copy.id}`, formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Produit", `Sous catégorie ${copy.title} modifié`);
                Routes.navigator.goBack();
            }
        }

    }

    public async deleteImg() {
        if((await this._dialogService.showDialog("Supprimer", "Voullez vous vraiment supprimer cette image", true)).confirmed){
            this.subCategory.image = null;
            this.file = null;
        }
    }

}