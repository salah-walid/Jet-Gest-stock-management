import { observer } from "mobx-react";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import editImg from "../../../assets/images/edit.png";
import trashBinWhite from "../../../assets/images/trash-bin-white.png";
import Routes from "../../../core/managers/routes";
import { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";
import ClientDetailViewModel from "../../viewmodels/clientViewModel/clientDetailViewModel";


interface Props extends RouteComponentProps<{id: string}>{
    
}

class ClientDetail extends Component<Props>{

    vm: ClientDetailViewModel = new ClientDetailViewModel();

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
                            this.vm.clientIsLoading
                            ? <div className="display-2">
                                Chargement
                            </div>
                            : <div>

                                <h1 className="display-1 text-center">
                                    Détail client
                                </h1>

                                <div className="row align-items-center">
                                    <div className="col text-center">
                                        <div className="display-2">
                                            {this.vm.client?.name} {this.vm.client?.lastName}
                                        </div>
                                        <div className="display-6 mt-4">
                                            {this.vm.client?.city}
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="text-nowrap fs-6">
                                            N°MF : {this.vm.client?.nMF}
                                        </div>

                                        <div className="text-nowrap fs-6">
                                            N°RC : {this.vm.client?.nRC}
                                        </div>

                                        <div className="text-nowrap fs-6">
                                            N°AI : {this.vm.client?.nAI}
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5">
                                    {this.vm.client?.adress}
                                </div>

                                {
                                    AuthentificationServiceSingleton.isAdmin
                                    ? <div className="row">
                                        <span className="col"></span>

                                        <a className="col-3 btn btn-seconday border fs-6 text-left" onClick={(e) => {Routes.navigator.push(Routes.clientForm + "/" + this.vm.client?.id)}}>
                                            <img src={editImg} className="btn-image"></img> Modifier
                                        </a>

                                        <span className="col-1"></span>

                                        <button className="col-3 btn btn-primary fs-6 text-left" onClick={(e) => this.vm.deleteClient()} >
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

export default observer(ClientDetail);