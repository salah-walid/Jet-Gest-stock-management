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


export default class ProductFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public product: ProductData= {
        id : null,
        title: "",
        description: "",
        price: 0,
        forcePrice: false,
        generatedPrice: 0,
        stock: 0,
        image: placeHolder,
        salesCount: 0,
        categories: [],
        subCategories: [],
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

    public async init(productId?: string) {
        if(productId){
            this.formType = FormType.update;

            let temp = await this._apiService?.getData<ProductData>(`gestion/getProduct/${productId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.product = temp;
            
        }else{
            this.formType = FormType.new;
        }
        this.initCategories();
    }

    public fileChanged(files: FileList | null) {
        if(files != null){
            this.file = files[0];
            this.product.image = URL.createObjectURL(this.file);
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
        
        let copy = Object.assign({}, this.product)
        copy.image = this.file

        if(this.formType === FormType.new){

            let formData = productToFormData(copy);

            let response = await this._apiService.postData<string>("gestion/postProduct", formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.ACCEPTED.valueOf()){
                this._dialogService.showDialog("Produit", `Produit ${copy.title} créé`);
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){
            
            let formData = productToFormData(copy, this.updateImage);

            let response = await this._apiService.putData<string>(`gestion/updateProduct/${copy.id}`, formData, {"Authorization" : `TOKEN ${this._authService.token}`}, `multipart/form-data; boundary=${formData.getBoundary}`);
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Produit", `Produit ${copy.title} modifié`);
                Routes.navigator.goBack();
            }
        }

    }

    public catSubsChanged(event: ChangeEvent<HTMLSelectElement>){
        let values = Array.from(event.target.selectedOptions, option => +option.value);
        switch (event.target.name) {
            case "categories":
                this.product.categories = [];
                values.map((elt) => {
                    let element = this.catsAndSubs.categories.find((item) => item.id === elt);
                    if(element)
                        this.product.categories.push(element);
                });
            break;

            case "subCategories":
                this.product.subCategories = [];
                values.map((elt) => {
                    let element = this.catsAndSubs.subCategory.find((item) => item.id === elt);
                    if(element)
                        this.product.subCategories.push(element);
                });
            break;

            default:
            break;
        }
    };

    public async deleteImg() {
        if((await this._dialogService.showDialog("Supprimer", "Voullez vous vraiment supprimer cette image", true)).confirmed){
            this.product.image = null;
            this.file = null;
        }
    }
}