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
import OrderData from "../../../core/models/orderData";
import ProductOrderData from "../../../core/models/productOrderData";


export default class OrderFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public order: OrderData= {
        orderList: [],
        totalHT: 0,
        totalTTC: 0,
        tva: 19,
        tvaAmount: 0,
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

            let temp = await this._apiService?.getData<OrderData>(`gestion/getOrder/${providerOrderId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.chosenSeller = temp.seller?.id?.toString() ?? this.chosenSeller;
            this.order = temp;
            
        }else{
            this.formType = FormType.new;
            this.order.tva = (await this._apiService.getData<{tva: number}>("config/getTva"))?.tva ?? 19;
        }

        this.getSellers();
    }

    public inputChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        event.currentTarget.parentElement?.classList.add("was-validated");
    }

    public async submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(!this.formRef.current?.checkValidity()){
            
            this._dialogService.showDialog("Facture", "Veuillez renseigner tout les champs correctement");
            return;
        }
        
        let copy = Object.assign({}, this.order)
        copy.seller = this.sellers.find((elt) => elt.id === +this.chosenSeller);

        if(this.formType === FormType.new){
            let response = await this._apiService.postData<string>("gestion/postOrder", {"order": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Facture", "Facture crée");
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){

            let response = await this._apiService.putData<string>(`gestion/updateOrder/${copy.id}`, {"order": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Facture", "Facture modifié");
                Routes.navigator.goBack();
            }
        }

    }

    public modifyProduct(index: number, entry: ProductOrderData){
        this.order.orderList[index] = entry;
        this.calculateTotal();
    }

    public async modifyClient(){
        let client = await this._dialogService.chooseClient();
        if(client){
            this.order.client = client;
        }
    }

    public calculateTotal(){
        let total = 0;

        for(let item of this.order.orderList){
            total += item.price;
        }

        this.order.totalHT = total;

        this.order.tvaAmount = (total * this.order.tva) / 100;
        this.order.totalTTC = total + this.order.tvaAmount;
    }

    public changeEntryPosition(from: number, to: number){
        if(to < 0 || to >= this.order.orderList.length){
            return;
        }
        let elt = this.order.orderList.splice(from, 1)[0];
        this.order.orderList.splice(to, 0, elt);
    }

    public async addProductOrder() {
        let product = await this._dialogService.chooseProduct();
        if(product){
            this.order.orderList.push({
                product: product,
                quantity: 1,
                unitPrice: product.generatedPrice,
                price: product.generatedPrice,
            })
        }

        this.calculateTotal();
    }

    public deleteEntry(index: number){
        this.order.orderList.splice(index, 1);
    }

}