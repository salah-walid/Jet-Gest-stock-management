import autoBind from 'auto-bind';
import { makeAutoObservable, observable} from 'mobx';
import Routes from '../../../core/managers/routes';
import HttpStatusCode from '../../../core/models/httpResponseStatus';
import OrderData from '../../../core/models/orderData';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import AuthentificationService, { AuthentificationServiceSingleton } from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';

class OrderDetailViewModel{

    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public order?: OrderData;
    public orderIsLoading: boolean= true;
    
    constructor(){
        autoBind(this);
        makeAutoObservable(this);
    }

    public async init(providerOrderId: number) :Promise<void>{
        this.orderIsLoading = true;
        this.order = await this._apiService?.getData<OrderData>(`gestion/getOrder/${providerOrderId}`) ?? this.order;
        this.orderIsLoading = false;
    }

    public async deleteOrder() {
        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette facture", true)).confirmed){
            return;
        }

        let response = await this._apiService.deleteData(`gestion/deleteOrder/${this.order?.id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
        if (response?.status === HttpStatusCode.OK){
            Routes.navigator.goBack();
        }
    }

    /* public async modifyProduct(id: number){
        if(this.providerOrder){
            let product = await this._dialogService.showProductPopOut();
            if(product){
                let item = Object.assign({}, this.providerOrder.orderList[id]);
                item.product = product;
                this.providerOrder.orderList[id] = item;
            }
        }
    } */

}

export default OrderDetailViewModel;