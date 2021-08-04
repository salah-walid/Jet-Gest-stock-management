import categoryViewModel from "../../ui/viewmodels/categoriesViewModels/categoryViewModel";
import clientsViewModel from "../../ui/viewmodels/clientViewModel/clientsViewModel";
import gestionViewModel from "../../ui/viewmodels/gestionViewModels/gestionViewModel";
import OrderRandoViewModel from "../../ui/viewmodels/orderRandoViewModel/OrderRandoViewModel";
import OrderViewModel from "../../ui/viewmodels/orderViewModel/OrderViewModel";
import providerOrderViewModel from "../../ui/viewmodels/providerOrderViewModel/providerOrderViewModel";
import providerViewModel from "../../ui/viewmodels/providerViewModels/providerViewModel";
import { DialogServiceSingelton } from "./DialogService";

export default class WebSocketService{

    private _dialogService = DialogServiceSingelton;

    static endPoint: string = "ws://127.0.0.1:8000/ws/updateListener";

    public socket = new WebSocket(WebSocketService.endPoint);

    public setup(){
        this.socket.onopen = () => {
            console.log("connected");
        };

        this.socket.onclose = async () => {
            let response = await this._dialogService.showDialog("Fermé", "connexion au serveur fermé, voulez vous réessayer", true);
            if(response.confirmed){
                this.socket = new WebSocket(WebSocketService.endPoint);
                this.setup();
            }
        }

        this.socket.onmessage = (e) => {
            let code = JSON.parse(e.data);
            this.update(code.update);
        }

    }

    private update(code: number){
        console.log(code);
        switch(code){
            case 1:
                gestionViewModel.init();
            break;
            case 2:
                clientsViewModel.init();
            break;
            case 3:
                providerViewModel.init();
            break;
            case 4:
                categoryViewModel.init();
                gestionViewModel.getCategories();
            break;
            case 5:
                providerOrderViewModel.getProviderOrders();
            break;
            case 6:
                OrderViewModel.init();
            break;
            case 7:
                OrderRandoViewModel.init();
            break;

            default:
            break;
        }
    }
}

export const SocketServiceSingelton = new WebSocketService();