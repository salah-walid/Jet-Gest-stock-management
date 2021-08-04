import { observer } from "mobx-react";
import React, { Component } from "react";
import ClientData from "../../../core/models/clientData";
import ClientCard from "../../components/clientCard";
import Pagination from "../../components/pagination";
import addImg from "../../../assets/images/add.png";

import vm from "../../viewmodels/clientViewModel/clientsViewModel";
import Routes from "../../../core/managers/routes";
import PopUpProp from "../../../core/models/PopupProp";

class Clients extends Component<PopUpProp<ClientData>>{

    constructor(props: any){
        super(props);

        vm.init();
    }
    
    render(){
        return (
            <div className="container">
                <h1 className="display-1 text-center">
                    Liste des clients
                </h1>

                
                <form onSubmit={vm.submited}>
                    
                    <div className="input-group row">
                        {
                            Object.keys(vm.possibleSearchKeys).map((key) => {
                                return (
                                    <div key={key} className="col-lg-6 col-12">
                                        <label htmlFor={key} className="form-label">{vm.possibleSearchKeys[key]} : </label>
                                        <input 
                                            type="text"
                                            value={vm.search.find(item => item.key === key )?.value}
                                            onChange={(e) => {vm.researchChanged(e)}}  
                                            className="form-control"
                                            name={key}
                                            id={key}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="row mt-4">
                        <button type="submit" className="btn btn-primary fs-6 text-white col-lg-2 col-12 offset-lg-10 offset-0">
                            Rechercher
                        </button>
                    </div>

                </form>

                <div className="row mt-4">
                    <a className="col-lg-1 col-12 offset-lg-11 offset-0 btn btn-primary" onClick={(e) => Routes.navigator.push(Routes.clientForm)} >
                        <img src={addImg} className="btn-image"></img>
                    </a>
                </div>

                <div className="mt-4">
                    {
                        vm.clients.Clients.map((item: ClientData) => {
                            return (
                                <ClientCard 
                                    client={item} 
                                    key={item.id} 
                                    onDelete={(id) => vm.deleteClient(id) }
                                    onClick={() => {
                                        
                                        if(!this.props.isPopup)
                                            Routes.navigator.push(`${Routes.clients}/${item.id}`);
                                        else{
                                            if(this.props.select)
                                                this.props.select(item);
                                        }
                                    }}
                                />
                            );
                        })
                    }
                </div>


                <Pagination pageCount={vm.clients.pageCount} activePage={vm.currentPage} onPageChanged={vm.setPage} maxShownPages={2} />
            </div>
        );
    }
}

export default observer(Clients);