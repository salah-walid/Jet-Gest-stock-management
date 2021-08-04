import { observer } from "mobx-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import editImg from "../../../assets/images/edit.png";
import trashBinWhite from "../../../assets/images/trash-bin-white.png";
import printerImg from "../../../assets/images/printer.png";
import Routes from "../../../core/managers/routes";
import { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import EntryCard from "../../components/entryCard";
import ProviderOrderDetailViewModel from "../../viewmodels/providerOrderViewModel/providerOrderDetailViewModel";
import ApiService from "../../../core/services/ApiService";


interface Props extends RouteComponentProps<{id: string}>{
    
}

class ProviderOrderDetail extends Component<Props>{

    vm: ProviderOrderDetailViewModel = new ProviderOrderDetailViewModel();

    constructor(props: Props){
        super(props);

        this.vm.init(+this.props.match.params.id);
    }

    render(){
        return (
            <div className='container-fluid'>
                <div className="my-4">
                    <div className="container justify-content-center">
                        {
                            this.vm.providerOrderIsLoading
                            ? <div className="display-2">
                                Chargement
                            </div>
                            : <div>

                                <h1 className="display-1 text-center">
                                    Détail pièce fournisseur
                                </h1>
                                <div className="display-2 text-center mt-4">
                                    PF{this.vm.providerOrder?.orderNumber}
                                </div>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 col fs-4">
                                        Vendeur : {this.vm.providerOrder?.seller?.username}
                                    </div>
                                    <div className="col-lg-6 col fs-4">
                                        Fournisseur : {this.vm.providerOrder?.provider?.name} {this.vm.providerOrder?.provider?.lastName}
                                    </div>
                                </div>

                                {/* inser order list here */}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">N°</th>
                                            <th scope="col">Titre</th>
                                            <th scope="col">Prix unitaire</th>
                                            <th scope="col">Quantité</th>
                                            <th scope="col">Montant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.vm.providerOrder?.orderList.map((item, index) => {
                                                return (
                                                    <EntryCard key={index} index={index} allowModification={false} entry={item}/>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>


                                <div className="text-right mt-4">
                                    <h2 className="fs-3 mb-3">
                                        Total : {this.vm.providerOrder?.total} DA
                                    </h2>
                                    <h2 className="fs-3 mb-3">
                                        Date : {this.vm.providerOrder?.creationDate}
                                    </h2>
                                </div>

                                {
                                    AuthentificationServiceSingleton.isAdmin
                                    ? <div className="row">
                                        <button className="col-lg-3 col offset-lg-1 offset-0 btn btn-seconday border fs-6 text-left" onClick={(e) => {window.open(`${ApiService.endPoint}gestion/printProviderInvoice/${this.vm.providerOrder?.id}`, "_blank")}}>
                                            <img src={printerImg} className="btn-image"></img> Imprimer
                                        </button>

                                        <button className="col-lg-3 col offset-lg-1 offset-0 btn btn-seconday border fs-6 text-left" onClick={(e) => {Routes.navigator.push(Routes.providerOrderForm + "/" + this.vm.providerOrder?.id)}}>
                                            <img src={editImg} className="btn-image"></img> Modifier
                                        </button>

                                        <button className="col-lg-3 col offset-lg-1 offset-0 btn btn-primary fs-6 text-left" onClick={(e) => this.vm.deleteProviderOrder()} >
                                            <img src={trashBinWhite} className="btn-image"></img> Supprimer
                                        </button>
                                    </div>
                                    : <></>
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(ProviderOrderDetail);