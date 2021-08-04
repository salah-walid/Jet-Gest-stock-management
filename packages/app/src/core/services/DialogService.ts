import { createRef } from "react";
import Dialog from "../managers/Dialog";
import ProductDialog from "../managers/ProductDialog";
import ClientData from "../models/clientData";
import DialogData from "../models/dialogData";
import ProductData from "../models/ProductData";
import ProviderData from "../models/provider";

export default class DialogService{
    public dialogRef = createRef<Dialog>();
    public productPopOutRef = createRef<ProductDialog>();

    public showDialog(title: any, body: any, needConfirmation: boolean = false): Promise<DialogData>{
        if(this.dialogRef.current)
            return this.dialogRef.current.showDialog(title, body, needConfirmation);
        else
            return new Promise<DialogData>((s, f) => {
                s({confirmed: false})
            });
    }

    public chooseProduct(): Promise<ProductData | undefined>{
        if(this.productPopOutRef.current)
            return this.productPopOutRef.current.showProductPopUp();
        else
            return new Promise<undefined>((s, f) => {
                s(undefined)
            });
    }

    public chooseClient(): Promise<ClientData | undefined>{
        if(this.productPopOutRef.current)
            return this.productPopOutRef.current.showClientPopUp();
        else
            return new Promise<undefined>((s, f) => {
                s(undefined)
            });
    }

    public chooseProvider(): Promise<ProviderData | undefined>{
        if(this.productPopOutRef.current)
            return this.productPopOutRef.current.showProviderPopUp();
        else
            return new Promise<undefined>((s, f) => {
                s(undefined)
            });
    }
}

export const DialogServiceSingelton = new DialogService();