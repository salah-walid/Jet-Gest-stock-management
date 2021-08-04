import React, { Component } from "react";
import { Button,Modal } from 'react-bootstrap'
import ProductData from "../models/ProductData";
import Gestion from '../../ui/views/gestionViews/gestion';
import ProviderData from "../models/provider";
import ProviderPage from "../../ui/views/providerViews/provider";
import Clients from "../../ui/views/clientViews/clients";
import ClientData from "../models/clientData";

interface State{
    title: any;
    showHideProductPopUp: boolean;
    showHideClientPopUp: boolean;
    showHideProviderPopUp: boolean;
}

export default class ProductDialog extends Component<{}, State>{

    public completeProductDialog(value?: ProductData | PromiseLike<ProductData>){};
    public completeClientDialog(value?: ClientData | PromiseLike<ClientData>){};
    public completeProviderDialog(value?: ProviderData | PromiseLike<ProviderData>){};
    public fail(reason?: any){};

    constructor(props: any) {
        super(props);
        this.state = {
            showHideProductPopUp: false,
            showHideClientPopUp: false,
            showHideProviderPopUp: false,
            title: ""
        };
    }


    showProductPopUp() : Promise<ProductData> {
        let completer = new Promise<ProductData>((s, f) => {
            this.completeProductDialog = s;
            this.fail = f;
        })
        this.setState({showHideProductPopUp: true});
        return completer;
    }

    finishProduct(product: ProductData | undefined){
        this.completeProductDialog(product);
        this.setState({showHideProductPopUp: false});
    }

    //!----------------------------------------------------------------------

    showClientPopUp() : Promise<ClientData> {
        let completer = new Promise<ClientData>((s, f) => {
            this.completeClientDialog = s;
            this.fail = f;
        })
        this.setState({showHideClientPopUp: true});
        return completer;
    }

    finishClient(client: ClientData | undefined){
        this.completeClientDialog(client);
        this.setState({showHideClientPopUp: false});
    }

    //!----------------------------------------------------------------------

    showProviderPopUp() : Promise<ProviderData> {
        let completer = new Promise<ProviderData>((s, f) => {
            this.completeProviderDialog = s;
            this.fail = f;
        })
        this.setState({showHideProviderPopUp: true});
        return completer;
    }

    finishProvider(provider: ProviderData | undefined){
        this.completeProviderDialog(provider);
        this.setState({showHideProviderPopUp: false});
    }

    //!----------------------------------------------------------------------

    render(){
        return (
            <>
                <Modal size="lg" show={this.state.showHideProductPopUp} onHide={() => this.finishProduct(undefined)}>
                    <Modal.Header closeButton closeLabel="" onClick={() => this.finishProduct(undefined)}>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <Gestion isPopup select={(product) => this.finishProduct(product)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="white" onClick={() => this.finishProduct(undefined)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.showHideClientPopUp} onHide={() => this.finishClient(undefined)}>
                    <Modal.Header closeButton closeLabel="" onClick={() => this.finishClient(undefined)}>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <Clients isPopup select={(client) => this.finishClient(client)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="white" onClick={() => this.finishClient(undefined)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.showHideProviderPopUp} onHide={() => this.finishProvider(undefined)}>
                    <Modal.Header closeButton closeLabel="" onClick={() => this.finishProvider(undefined)}>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <ProviderPage isPopup select={(provider) => this.finishProvider(provider)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="white" onClick={() => this.finishProvider(undefined)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
    )
    }
}