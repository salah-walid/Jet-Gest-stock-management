import { action, makeObservable, observable } from 'mobx';
import Routes from '../../../core/managers/routes';
import HttpStatusCode from '../../../core/models/httpResponseStatus';
import ProductData from '../../../core/models/ProductData';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import AuthentificationService, { AuthentificationServiceSingleton } from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';

class ProductDetailViewModel{

    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public product?: ProductData;
    public productIsLoading: boolean= true;
    
    constructor(){
        makeObservable(
            this,
            {
                product: observable,
                productIsLoading: observable,

                init: action,
            }
        );
        this.init = this.init.bind(this);
    }

    public async init(productId: number) :Promise<void>{
        this.productIsLoading = true;
        this.product = await this._apiService?.getData<ProductData>(`gestion/getProduct/${productId}`) ?? this.product;
        this.productIsLoading = false;
    }

    public async deleteProduct() {
        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer cette article", true)).confirmed){
            return;
        }

        let response = await this._apiService.deleteData(`gestion/deleteProduct/${this.product?.id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
        if (response?.status === HttpStatusCode.OK){
            Routes.navigator.goBack();
        }
    }

}

export default ProductDetailViewModel;