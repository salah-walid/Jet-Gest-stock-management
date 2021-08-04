import { observer } from "mobx-react";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import ProductDetailViewModel from "../../viewmodels/gestionViewModels/productDetailViewModel";

import editImg from "../../../assets/images/edit.png";
import trashBinWhite from "../../../assets/images/trash-bin-white.png";
import placeHolder from "../../../assets/images/placeholder.png";
import Routes from "../../../core/managers/routes";
import { AuthentificationServiceSingleton } from "../../../core/services/authentificationService";


interface Props extends RouteComponentProps<{id: string}>{
    
}

class ProductDetail extends Component<Props>{

    vm: ProductDetailViewModel = new ProductDetailViewModel();

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
                            this.vm.productIsLoading
                            ? <div className="display-2">
                                Chargement
                            </div>
                            : <div>
                                <div className="text-center">
                                    <img src={this.vm.product?.image?.toString() ?? placeHolder} className="productDetailImg" />
                                </div>

                                <div className="row align-items-center">
                                    <div className="display-2 col text-center">
                                        {this.vm.product?.title}
                                    </div>

                                    <div className="col-2">
                                        <div className="text-nowrap fs-4">
                                            {this.vm.product?.generatedPrice} DA
                                        </div>

                                        <div className="text-nowrap fs-4">
                                            {this.vm.product?.stock} PCS
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5">
                                    {this.vm.product?.description}
                                </div>

                                {
                                    AuthentificationServiceSingleton.isAdmin
                                    ? <div className="row">
                                        <span className="col"></span>

                                        <a className="col-3 btn btn-seconday border fs-6 text-left" onClick={(e) => {Routes.navigator.push(Routes.productForm + "/" + this.vm.product?.id)}}>
                                            <img src={editImg} className="btn-image"></img> Modifier
                                        </a>

                                        <span className="col-1"></span>

                                        <button className="col-3 btn btn-primary fs-6 text-left" onClick={(e) => this.vm.deleteProduct()} >
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

export default observer(ProductDetail);