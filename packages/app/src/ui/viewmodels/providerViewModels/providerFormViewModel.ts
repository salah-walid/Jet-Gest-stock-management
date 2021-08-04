import { makeAutoObservable} from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";

import ApiService, { ApiServiceSingleton } from "../../../core/services/ApiService";
import Routes from "../../../core/managers/routes";
import autoBind from "auto-bind";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import FormType from "../../../core/models/formType";
import DialogService, { DialogServiceSingelton } from "../../../core/services/DialogService";
import ClientData from "../../../core/models/clientData";
import ProviderData from "../../../core/models/provider";


export default class ProviderFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public provider: ProviderData= {
        id : null,
        adress: "",
        city: "",
        lastName: "",
        nAI: "",
        name: "",
        nMF: "",
        nRC: "",
    };

    public formType: FormType = FormType.new;
    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }


    public async init(providerId?: string) {
        if(providerId){
            this.formType = FormType.update;

            let temp = await this._apiService?.getData<ProviderData>(`gestion/getProvider/${providerId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.provider = temp;
            
        }else{
            this.formType = FormType.new;
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
        
        let copy = Object.assign({}, this.provider)

        if(this.formType === FormType.new){


            let response = await this._apiService.postData<string>("gestion/postProvider", copy, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Fournisseur", `Fournisseur ${copy.name} créé`);
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){

            let response = await this._apiService.putData<string>(`gestion/updateProvider/${copy.id}`, copy, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Fournisseur", `Fournisseur ${copy.name} modifié`);
                Routes.navigator.goBack();
            }
        }

    }
}