import { entries, makeAutoObservable} from "mobx";
import { ChangeEvent, createRef, FormEvent } from "react";

import ApiService, { ApiServiceSingleton } from "../../../core/services/ApiService";
import Routes from "../../../core/managers/routes";
import autoBind from "auto-bind";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import HttpStatusCode from "../../../core/models/httpResponseStatus";
import FormType from "../../../core/models/formType";
import DialogService, { DialogServiceSingelton } from "../../../core/services/DialogService";
import UserData from "../../../core/models/UserData";
import OrderData from "../../../core/models/orderData";
import ProductOrderData from "../../../core/models/productOrderData";
import OrderRandoData from "../../../core/models/orderRandoData";


export default class OrderRandoFormViewModel{
    
    private _apiService : ApiService = ApiServiceSingleton;
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public formRef = createRef<HTMLFormElement>();

    public order: OrderRandoData= {
        orderList: [],
        total: 0,
        client: "",
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

            let temp = await this._apiService?.getData<OrderRandoData>(`gestion/getRandoOrder/${providerOrderId}`)
            if(temp === null){
                Routes.navigator.goBack();
                return;
            }

            this.chosenSeller = temp.seller?.id?.toString() ?? this.chosenSeller;
            this.order = temp;
            
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
            
            this._dialogService.showDialog("Facture", "Veuillez renseigner tout les champs correctement");
            return;
        }
        
        let copy = Object.assign({}, this.order)
        copy.seller = this.sellers.find((elt) => elt.id === +this.chosenSeller);

        if(this.formType === FormType.new){
            let response = await this._apiService.postData<string>("gestion/postRandoOrder", {"order": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.CREATED.valueOf()){
                this._dialogService.showDialog("Bon pour", "Bon pour crée");
                Routes.navigator.goBack();
            }
        }else if(this.formType === FormType.update){

            let response = await this._apiService.putData<string>(`gestion/updateRandoOrder/${copy.id}`, {"order": JSON.stringify(copy)}, {"Authorization" : `TOKEN ${this._authService.token}`});
            if(response?.status === HttpStatusCode.OK.valueOf()){
                this._dialogService.showDialog("Bon pour", "Bon pour modifié");
                Routes.navigator.goBack();
            }
        }

    }

    public modifyProduct(index: number, entry: ProductOrderData){
        this.order.orderList[index] = entry;
        this.calculateTotal();
    }


    public calculateTotal(){
        let total = 0;

        for(let item of this.order.orderList){
            total += item.price;
        }

        this.order.total = total;
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