import { observer } from 'mobx-react';
import React, {Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import closeImg from "../../../assets/images/close.png";
import checkImg from "../../../assets/images/check.png";
import Routes from '../../../core/managers/routes';
import FormType from '../../../core/models/formType';

import addImg from "../../../assets/images/add.png";
import ProductOrderCard from '../../components/productOrderCard';
import OrderRandoFormViewModel from '../../viewmodels/orderRandoViewModel/OrderRandoFormViewModel';
import ProductRandoOrderCard from '../../components/productRandoOrderData';

interface Props extends RouteComponentProps<{id?: string}>{
    
}

class OrderRandoForm extends Component<Props> {

    vm: OrderRandoFormViewModel = new OrderRandoFormViewModel();

    constructor(props: Props){
        super(props);

        this.vm.init(props.match.params.id);
    }

    render() {
        return (
            <div className='container-fluid'>

                <div className="my-4">
                    <h1 className="display-1 text-center mb-5">
                        {
                            this.vm.formType === FormType.new
                            ? "Nouveaux Bon Pour"
                            : "Modifier Bon Pour"
                        }
                    </h1>

                    <form className="g-3 needs-validation" ref={this.vm.formRef} onSubmit={this.vm.submit} noValidate>
                        <div className="row">
                            <div className="input-group has-validation col">
                                <input 
                                    type="text" 
                                    name="name"
                                    onChange={(e) => this.vm.order.client = e.target.value}
                                    value={this.vm.order.client}
                                    className="form-control" 
                                    pattern=".{3,}" 
                                    required 
                                />
                            </div>

                            <div className="col offset-lg-2 offset-0">
                                <select name="seller" className="form-select" id="sellerForm" onChange={(e) => this.vm.chosenSeller = e.target.value} value={this.vm.chosenSeller}>
                                    <option value="">Selectioner un vendeur...</option>
                                    {
                                        this.vm.sellers.map((item, index) => {
                                            return (<option key={index} value={item.id?.toString()}>{item.username}</option>)
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="mt-4">
                            <a className="btn btn-primary" onClick={(e) => this.vm.addProductOrder()}>
                                <img src={addImg} className="btn-image" />
                            </a>
                        </div>

                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">N°</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Prix unitaire</th>
                                    <th scope="col">Quantité</th>
                                    <th scope="col">Montant</th>
                                    <th scope="col">Controle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.vm.order?.orderList.map((item, index) => {
                                        return (
                                            <ProductRandoOrderCard 
                                                key={index} 
                                                index={index} 
                                                allowModification={true} 
                                                productOrder={item} 
                                                editEntry={this.vm.modifyProduct} 
                                                changePosition={this.vm.changeEntryPosition}
                                                onDelete={this.vm.deleteEntry}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <p className="text-end fs-4 my-4">
                            Total : {this.vm.order.total.toFixed(2)} DA
                        </p>

                        <div className="row my-5">
                            <span className="col"></span>

                            <a className="col-2 btn btn-seconday border fs-6 text-left text-primary" onClick={(e) => Routes.navigator.goBack()} >
                                <img src={closeImg} className="btn-image" /> Annuler
                            </a>

                            <span className="col-1"></span>

                            <button type="submit" className="col-2 btn btn-primary fs-6 text-left text-white">
                                <img src={checkImg} className="btn-image" /> Confirmer
                            </button>
                        </div>
                    </form> 

                </div>

            </div>
        )
    }
}

export default observer(OrderRandoForm)
