import { makeAutoObservable} from "mobx";
import autoBind from "auto-bind";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import UserData, { hasAdminPrivileges } from "../../../core/models/UserData";
import Routes from "../../../core/managers/routes";
import { ApiServiceSingleton } from "../../../core/services/ApiService";

export default class UserPageViewModel{
    
    private _authService : AuthentificationService = AuthentificationServiceSingleton;
    private _apiService = ApiServiceSingleton;

    public userIsLoading: boolean = true;
    public users: UserData[] = [];
    public chosenUserId: string= "";

    public get user(): UserData | null {
        return this._authService.user;
    }
    
    constructor(){

        autoBind(this);
        makeAutoObservable(this);

    }

    public async init(){
        this.userIsLoading = true;

        await this._authService.getUser();
        if(this.user && hasAdminPrivileges(this.user)){
            this.users = await this._apiService.getData("auth/userList", {"Authorization" : `TOKEN ${this._authService.token}`}) ?? this.users;
            this.chosenUserId = this.users[0].id?.toString() ?? ""
        }

        this.userIsLoading = false;
    }


    public logout(){
        this._authService.logout();
        Routes.navigator.push(Routes.homePage);
    }

}