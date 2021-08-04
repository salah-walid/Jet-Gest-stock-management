import { entries, makeAutoObservable} from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";

import ApiService, { ApiServiceSingleton } from "../../../core/services/ApiService";
import Routes from "../../../core/managers/routes";
import autoBind from "auto-bind";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import FormType from "../../../core/models/formType";
import DialogService, { DialogServiceSingelton } from "../../../core/services/DialogService";
import ProviderOrder from "../../../core/models/providerOrder";
import Entries from "../../../core/models/entries";
import UserData from "../../../core/models/UserData";


export default class ProviderOrderFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public providerOrder: ProviderOrder= {
        id : null,
        orderList: [],
        total: 0
    };

    public sellers: UserData[] = [];
    public chosenSeller: string = "";

    public formType: FormType = FormType.new;
    
    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }

    public async getSellers() {
        this.sellers = await this._apiService?.getData<UserData[]>("auth/userList", {"Authorization" : `TOKEN ${this._authService.token}`}) ?? this.sellers;
    }

    public async init(providerOrderId?: string) {
        if(providerOrderId){
            this.formType = FormType.update;

            let temp = await this._apiService?.getData<ProviderOrder>(`gestion/getProviderOrder/${providerOrderId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.chosenSeller = temp.seller?.id?.toString() ?? this.chosenSeller;
            this.providerOrder = temp;
            
        }else{
            this.formType = FormType.new;
        }

        this.getSellers();
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
        
        let copy = Object.assign({}, this.providerOrder)
        copy.seller = this.sellers.find((elt) => elt.id === +this.chosenSeller);

        if(this.formType === FormType.new){
            let response = await this._apiService.postData<string>("gestion/postProviderOrder", {"providerOrder": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Fournisseur", "Pièce fournisseur crée");
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){

            let response = await this._apiService.putData<string>(`gestion/updateProviderOrder/${copy.id}`, {"providerOrder": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Fournisseur", "Pièce fournisseur modifié");
                Routes.navigator.goBack();
            }
        }

    }

    public modifyProduct(index: number, entry: Entries){
        this.providerOrder.orderList[index] = entry;
        this.calculateTotal();
    }

    public async modifyProvider(){
        let provider = await this._dialogService.chooseProvider();
        if(provider){
            this.providerOrder.provider = provider;
        }
    }

    public calculateTotal(){
        let total = 0;

        for(let item of this.providerOrder.orderList){
            total += item.price;
        }

        this.providerOrder.total = total;
    }

    public changeEntryPosition(from: number, to: number){
        if(to < 0 || to >= this.providerOrder.orderList.length){
            return;
        }
        let elt = this.providerOrder.orderList.splice(from, 1)[0];
        this.providerOrder.orderList.splice(to, 0, elt);
    }

    public async addEntry() {
        let product = await this._dialogService.chooseProduct();
        if(product){
            this.providerOrder.orderList.push({
                product: product,
                quantity: 1,
                unitPrice: product.generatedPrice,
                price: product.generatedPrice,
            })
        }

        this.calculateTotal();
    }

    public deleteEntry(index: number){
        this.providerOrder.orderList.splice(index, 1);
    }

}