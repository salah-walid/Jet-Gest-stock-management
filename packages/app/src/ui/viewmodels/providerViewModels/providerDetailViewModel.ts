import autoBind from 'auto-bind';
import { makeAutoObservable} from 'mobx';
import Routes from '../../../core/managers/routes';
import HttpStatusCode from '../../../core/models/httpResponseStatus';
import ProviderData from '../../../core/models/provider';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import AuthentificationService, { AuthentificationServiceSingleton } from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';

class ProviderDetailViewModel{

    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public provider?: ProviderData;
    public providerIsLoading: boolean= true;
    
    constructor(){
        makeAutoObservable(this);
        autoBind(this);
    }

    public async init(productId: number) :Promise<void>{
        this.providerIsLoading = true;
        this.provider = await this._apiService?.getData<ProviderData>(`gestion/getProvider/${productId}`) ?? this.provider;
        this.providerIsLoading = false;
    }

    public async deleteProvider() {
        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer ce fournisseur", true)).confirmed){
            return;
        }

        let response = await this._apiService.deleteData(`gestion/deleteProvider/${this.provider?.id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
        if (response?.status === HttpStatusCode.OK){
            Routes.navigator.goBack();
        }
    }

}

export default ProviderDetailViewModel;