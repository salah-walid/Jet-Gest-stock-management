import autoBind from 'auto-bind';
import { makeAutoObservable } from 'mobx';
import { ChangeEvent, FormEvent } from 'react';
import Routes from '../../core/managers/routes';
import AuthentificationService, { AuthentificationServiceSingleton } from '../../core/services/authentificationService';
import DialogService, { DialogServiceSingelton } from '../../core/services/DialogService';

class LoginViewModel{
    
    private _authentificationService : AuthentificationService = AuthentificationServiceSingleton;
    private _dialogService : DialogService = DialogServiceSingelton;

    public user: string = "";
    public password: string = ""; 

    constructor(){
        makeAutoObservable(this);

        autoBind(this);
    }
    
    public handleInputChange(event: ChangeEvent<HTMLInputElement>): void{
        switch(event.target.name){
            case "user":
                this.user = event.target.value;
            break;

            case "password":
                this.password = event.target.value;
            break;
            default:
            break;
        }
    };

    public async connect(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let response = await this._authentificationService.login(this.user, this.password);
        
        switch (response) {
            case 0:
                console.log("Wrong data");
                this._dialogService.showDialog("Erreur", "Erreur serveur");
                break; 
            case 1:
                console.log("Wrong auth");
                this._dialogService.showDialog("Erreur", "Utilisateur ou Mot de passe incorrect");
                break;
            case 2:
                console.log("Correct");
                this._dialogService.showDialog("Succès", "Connecté");
                await this._authentificationService.getUser();
                Routes.navigator.push(Routes.gestionPage);
                break;
            default:
                break;
        }

        
    };
    
}

export default LoginViewModel;

