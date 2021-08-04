import { observer } from "mobx-react";
import React, { Component } from "react";
import Pagination from "../../components/pagination";
import addImg from "../../../assets/images/add.png";

import vm from "../../viewmodels/providerOrderViewModel/providerOrderViewModel";
import { Link } from "react-router-dom";
import Routes from "../../../core/managers/routes";
import ProviderOrder from "../../../core/models/providerOrder";
import ProviderOrderCard from "../../components/providerOrderCard";


class ProviderOrderPage extends Component{

    constructor(props: any){
        super(props);

        vm.init();
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-1 text-center">
                    Liste des pièces Fournisseur
                </h1>

                
                <form onSubmit={vm.submited}>
                    
                    <div className="input-group row">
                        {
                            Object.keys(vm.possibleSearchKeys).map((key) => {
                                return (
                                    <div key={key} className="col-lg-6 col-12">
                                        <label htmlFor={key} className="form-label">{vm.possibleSearchKeys[key][0]} : </label>
                                        <input 
                                            type={vm.possibleSearchKeys[key][1]}
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

                    <div className="row mt-4">
                        <div className="col">
                            <label htmlFor="sellerForm" className="form-label">Vendeur : </label>
                            <select name="seller" className="form-select" id="sellerForm" onChange={vm.dropDownChanged} value={vm.chosenSeller}>
                                <option value="">Filtrer par vendeur...</option>
                                {
                                    vm.sellers.map((item, index) => {
                                        return (<option key={index} value={item.id?.toString()}>{item.username}</option>)
                                    })
                                }
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="subCategoriesForm" className="form-label">Fournisseur : </label>
                            <select name="provider" className="form-select" id="subCategoriesForm" onChange={vm.dropDownChanged} value={vm.chosenProvider}>
                                <option value="">Filtrer par Fournisseur...</option>
                                {
                                    vm.providers.map(
                                        item => {
                                            return(<option key={item.id} value={item.id?.toString()}>{item.name + " " + item.lastName}</option>)
                                        }
                                    )
                                }
                            </select>
                        </div>
                    </div>

                </form>

                <div className="row mt-4">
                    <Link className="col-lg-1 col-12 offset-lg-11 offset-0 btn btn-primary" to={Routes.providerOrderForm}>
                        <img src={addImg} className="btn-image"></img>
                    </Link>
                </div>

                <div className="mt-4">
                    {
                        vm.providersOrders.providerOrders.map((item: ProviderOrder) => {
                            return (
                                <ProviderOrderCard key={item.id} providerOrder={item} onDelete={vm.deleteProviderOrder} />
                            );
                        })
                    }
                </div>


                <Pagination pageCount={vm.providersOrders.pageCount} activePage={vm.currentPage} onPageChanged={vm.setPage} maxShownPages={2} />
            </div>
        );
    }
}

export default observer(ProviderOrderPage);