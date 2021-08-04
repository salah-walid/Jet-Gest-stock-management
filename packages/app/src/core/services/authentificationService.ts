import UserData, { hasAdminPrivileges } from "../models/UserData";
import ApiService, { ApiServiceSingleton } from "./ApiService";
import LocalStorageService, { LocalStorageServiceSingleton } from "./localStorageService";

import autoBind from "auto-bind";
import Routes from "../managers/routes";

interface LoginResponse{
    status: number;
    token: string;
}

export default class AuthentificationService{

    private _localStorageService: LocalStorageService = LocalStorageServiceSingleton;

    private _apiService: ApiService = ApiServiceSingleton;

    public token: string | null = null;
    public user: UserData | null = null;

    constructor(){
        autoBind(this);
    }

    public get isConnected() : boolean{
        if(this.token)
            return true;
        else
            return false;
    }

    public get isAdmin(): boolean{
        return this.isConnected && hasAdminPrivileges(this.user);
    }

    public loadLocalToken() : boolean{
        this.token = this._localStorageService?.getData<string>(LocalStorageService.authKey);
        return this.token !== null;
    }

    public async getUser(){
        if(this.token){
            this.user = await this._apiService?.getData<UserData>("auth/getUser", {"Authorization" : `TOKEN ${this.token}`});
            if (this.user === null){
                this.logout();
                Routes.navigator.push(Routes.homePage);
            }
        }
    }

    public async login(username: string, password: string) : Promise<number | undefined>{
        let response = (await this._apiService?.postData<LoginResponse>("auth/login", {"username": username, "password": password}))?.data;
        
        if(response?.status){
            this.token = response.token;
            this._localStorageService.setData(LocalStorageService.authKey, this.token);
        }

        return response?.status;
    }

    public logout(){
        this.token = null;
        this._localStorageService?.removeItem(LocalStorageService.authKey);
    }
}

export let AuthentificationServiceSingleton = new AuthentificationService();