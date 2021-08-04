import { observer } from "mobx-react";
import React, { Component } from "react";
import Pagination from "../../components/pagination";
import addImg from "../../../assets/images/add.png";

import vm from "../../viewmodels/orderRandoViewModel/OrderRandoViewModel";
import { Link } from "react-router-dom";
import Routes from "../../../core/managers/routes";
import OrderData from "../../../core/models/orderData";
import OrderCard from "../../components/orderCard";
import OrderRandoData from "../../../core/models/orderRandoData";
import OrderRandoCard from "../../components/orderRandoCard";


class OrderRandoPage extends Component{

    constructor(props: any){
        super(props);

        vm.init();
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-1 text-center">
                    Liste des Bons Pour
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

                    <div className="mt-4">
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

                </form>

                <div className="row mt-4">
                    <Link className="col-lg-1 col-12 offset-lg-11 offset-0 btn btn-primary" to={Routes.orderRandoForm}>
                        <img src={addImg} className="btn-image"></img>
                    </Link>
                </div>

                <div className="mt-4">
                    {
                        vm.orders.order.map((item: OrderRandoData) => {
                            return (
                                <OrderRandoCard key={item.id} order={item} onDelete={vm.deleteOrder} />
                            );
                        })
                    }
                </div>


                <Pagination pageCount={vm.orders.pageCount} activePage={vm.currentPage} onPageChanged={vm.setPage} maxShownPages={2} />
            </div>
        );
    }
}

export default observer(OrderRandoPage);