import { observer } from "mobx-react";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import editImg from "../../../assets/images/edit.png";
import trashBinWhite from "../../../assets/images/trash-bin-white.png";
import Routes from "../../../core/managers/routes";
import { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import ClientDetailViewModel from "../../viewmodels/clientViewModel/clientDetailViewModel";
import ProviderDetailViewModel from "../../viewmodels/providerViewModels/providerDetailViewModel";


interface Props extends RouteComponentProps<{id: string}>{
    
}

class ProviderDetail extends Component<Props>{

    vm: ProviderDetailViewModel = new ProviderDetailViewModel();

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
                            this.vm.providerIsLoading
                            ? <div className="display-2">
                                Chargement
                            </div>
                            : <div>

                                <h1 className="display-1 text-center">
                                    Détail fournisseur
                                </h1>

                                <div className="row align-items-center">
                                    <div className="col text-center">
                                        <div className="display-2">
                                            {this.vm.provider?.name} {this.vm.provider?.lastName}
                                        </div>
                                        <div className="display-6 mt-4">
                                            {this.vm.provider?.city}
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="text-nowrap fs-6">
                                            N°MF : {this.vm.provider?.nMF}
                                        </div>

                                        <div className="text-nowrap fs-6">
                                            N°RC : {this.vm.provider?.nRC}
                                        </div>

                                        <div className="text-nowrap fs-6">
                                            N°AI : {this.vm.provider?.nAI}
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5">
                                    {this.vm.provider?.adress}
                                </div>

                                {
                                    AuthentificationServiceSingleton.isAdmin
                                    ? <div className="row">
                                        <span className="col"></span>

                                        <button className="col-3 btn btn-seconday border fs-6 text-left" onClick={(e) => {Routes.navigator.push(Routes.providerForm + "/" + this.vm.provider?.id)}}>
                                            <img src={editImg} className="btn-image"></img> Modifier
                                        </button>

                                        <span className="col-1"></span>

                                        <button className="col-3 btn btn-primary fs-6 text-left" onClick={(e) => this.vm.deleteProvider()} >
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

export default observer(ProviderDetail);