import autoBind from 'auto-bind';
import { makeAutoObservable} from 'mobx';
import Routes from '../../../core/managers/routes';
import ClientData from '../../../core/models/clientData';
import HttpStatusCode from '../../../core/models/httpResponseStatus';
import ApiService, { ApiServiceSingleton } from '../../../core/services/ApiService';
import AuthentificationService, { AuthentificationServiceSingleton } from '../../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../../core/services/DialogService';

class ClientDetailViewModel{

    private _apiService: ApiService = ApiServiceSingleton;
    private _authService: AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService: DialogService  = DialogServiceSingelton;

    public client?: ClientData;
    public clientIsLoading: boolean= true;
    
    constructor(){
        makeAutoObservable(this);
        autoBind(this);
    }

    public async init(productId: number) :Promise<void>{
        this.clientIsLoading = true;
        this.client = await this._apiService?.getData<ClientData>(`gestion/getClient/${productId}`) ?? this.client;
        this.clientIsLoading = false;
    }

    public async deleteClient() {
        if(!(await this._dialogService.showDialog("Confirmation", "Voulez vous vraiment supprimer ce client", true)).confirmed){
            return;
        }

        let response = await this._apiService.deleteData(`gestion/deleteClient/${this.client?.id}`, {"Authorization" : `TOKEN ${this._authService.token}`});
        if (response?.status === HttpStatusCode.OK){
            Routes.navigator.goBack();
        }
    }

}

export default ClientDetailViewModel;