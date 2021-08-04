import { FC } from "react";
import Routes from "../../core/managers/routes";
import ProductData from "../../core/models/ProductData";

import editImg from "../../assets/images/edit.png"
import trashImg from "../../assets/images/trash-bin.png"
import placeHolder from "../../assets/images/placeholder.png";
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";

interface Props{
    product: ProductData;
    onDelete: (id: number | null | undefined) => void;
    onClick: () => void;
}

const ProductCard : FC<Props> = (props) => {

    
    return (
        <div className="card mb-3" onClick={() => props.onClick()} >
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col-lg-2 col-sm-4 col-6">
                        <img src={props.product.image?.toString() ?? placeHolder} className="w-100" />
                    </div>

                    <div className="col">
                        <div className="row align-items-end mb-4">
                            <h3 className="card-title col display-5 text-nowrap m-0">{props.product.title}</h3>
                            <div className="col-xl col-lg-12 fs-4 text-nowrap text-center">
                                {props.product.stock} PCS
                            </div>

                            <div className="col-xl col-lg-12 fs-4 text-nowrap text-center">
                                {props.product.generatedPrice} DA
                            </div>
                        </div>
                        <p className="card-text description-text-productCard">{props.product.description}</p>
                    </div>

                    {
                        AuthentificationServiceSingleton.isAdmin
                        ? <div className="col-1">
                            <span className="flex-d">
                                <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.productForm + "/" + props.product.id)}}>
                                    <img src={editImg} className="btn-image"></img>
                                </a>
                                <a className="btn btn-white" onClick={(e) => {
                                    e.stopPropagation(); 
                                    props.onDelete(props.product.id);
                                    }
                                }>
                                    <img src={trashImg} className="btn-image"></img>
                                </a>
                            </span>
                        </div>
                        : <></>
                    }

                    

                </div>
            </div>
        </div>
    )
}

export default ProductCard;