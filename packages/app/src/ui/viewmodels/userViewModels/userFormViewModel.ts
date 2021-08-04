import autoBind from "auto-bind";
import { makeAutoObservable } from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";
import Routes from "../../../core/managers/routes";
import AuthGroup from "../../../core/models/AuthGroup";
import FormType from "../../../core/models/formType";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import UserData from "../../../core/models/UserData";
import { ApiServiceSingleton } from "../../../core/services/ApiService";
import { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import { DialogServiceSingelton } from "../../../core/services/DialogService";

export default class UserFormViewModel{
    
    private _apiService = ApiServiceSingleton;
    private _authService = AuthentificationServiceSingleton;
    private _dialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();
    public formType: FormType = FormType.new;

    public user: UserData = {
        id : null,
        username : "",
        authGroups: []
    };
    public newPass: boolean = true;
    public password: string = "";
    public groups : AuthGroup[] = [];
    
    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }

    public async init(userId?: string){
        if(userId){
            this.formType = FormType.update;
            this.newPass = false;
            let temp = await this._apiService.getData<UserData>(`auth/user/${userId}`, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.user = temp; 
        }

        this.getGroups();
    }

    public inputChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        event.currentTarget.parentElement?.classList.add("was-validated");
    }

    public authGroupChanged(event: ChangeEvent<HTMLSelectElement>){
        let values = Array.from(event.target.selectedOptions, option => +option.value);
        this.user.authGroups = [];
        values.map((elt) => {
            let element = this.groups.find((item) => item.id === elt);
            if(element)
                this.user.authGroups.push(element);
        });
    }

    public async submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(!this.formRef.current?.checkValidity()){
            this._dialogService.showDialog("Client", "Veuillez renseigner tout les champs correctement");
            return;
        }

        if (this.formType == FormType.new){
            let user = {
                ...this.user,
                "password": this.password,
            };
            let response = await this._apiService.postData<string>("auth/postUser", user, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Utilisateur", `Utilisateur ${this.user.username} créé`);
                Routes.navigator.goBack();
            }
        }else if(this.formType == FormType.update){
            let user: any = {
                ...this.user,
            };
            if (this.newPass)
                user["password"] = this.password
            
                let response = await this._apiService.putData<string>(`auth/updateUser/${user.id}`, user, {"Authorization" : `TOKEN ${this._authService.token}`});
                if(response?.status === HttpStatusCode.OK.valueOf()){
                    this._dialogService.showDialog("Utilisateur", `Utilisateur ${this.user.username} modifiée`);
                    Routes.navigator.goBack();
                }
        }
    }

    public async getGroups(){
        this.groups = await this._apiService.getData<AuthGroup[]>("auth/getGroups", {"Authorization" : `TOKEN ${this._authService.token}`}) ?? this.groups;

    }
}