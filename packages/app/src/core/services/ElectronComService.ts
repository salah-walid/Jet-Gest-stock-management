import {IpcRenderer} from "electron";
import Routes from "../managers/routes";
import isElectron from 'is-electron';

export default class ElectronComService{
    public init(){
        if(isElectron()){
            const ipcRenderer: IpcRenderer = require("electron").ipcRenderer
            console.log("main " + ipcRenderer);
            ipcRenderer.on("Nav-settings", (event: any, message: any) => {
                window.open(`${window.location.protocol + '//' + window.location.host}#${Routes.settingsPage}`, "_blank");
            });
        }
    }
}

export let ElectronComServiceSingleton = new ElectronComService();