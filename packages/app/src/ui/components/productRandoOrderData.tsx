import { FC } from "react";
import Routes from "../../core/managers/routes";

import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import { DialogServiceSingelton } from "../../core/services/DialogService";

import upArrowImg from '../../assets/images/up-arrow.png';
import downArrowImg from '../../assets/images/down-arrow.png';
import thrashImg from '../../assets/images/trash-bin.png'
import ProductRandoOrderData from "../../core/models/productRandoOrderData";

interface Props{
    productOrder: ProductRandoOrderData;
    index: number;
    editEntry?: (id: number, entry: ProductRandoOrderData) => void;
    allowModification: boolean;
    changePosition?: (from: number, to: number) => void;
    onDelete?: (index: number) => void;
}

const ProductRandoOrderCard : FC<Props> = (props) => {
    let entry = Object.assign({}, props.productOrder);

    const updateProduct = async () => {
        let product = await DialogServiceSingelton.chooseProduct();
        if(product){
            entry.product = product;
            entry.unitPrice = product.generatedPrice;
            updatePrice();
            if(props.editEntry)
                props.editEntry(props.index, entry);
        }
    };

    const updatePrice = (price: number | undefined = undefined) => {
        if(price)
            entry.price = price;
        else
            entry.price = entry.unitPrice * entry.quantity;
    }

    return (
        <tr onClick={() => Routes.navigator.push(`${Routes.productDetail}/${props.productOrder.product.id}`)}>
            {
                props.allowModification
                ? <>
                    <th scope="row">{props.index}</th>
                    <td className="input-group">
                        <input type="text" value={entry.product.title} className="form-control" placeholder="Produit" disabled/>
                        <div className="input-group-append">
                            <button className="col offset-1 btn btn-seconday border fs-6 text-left" onClick={(e) => {e.stopPropagation(); updateProduct();}}>
                                Modifier
                            </button>
                        </div>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                        <input 
                            type="number" 
                            value={props.productOrder.unitPrice} 
                            step={0.01}
                            onChange={(e) => {
                                if(AuthentificationServiceSingleton.isAdmin){
                                    entry.unitPrice = +e.target.value; 
                                    updatePrice(); 
                                    if(props.editEntry)
                                        props.editEntry(props.index, entry);
                                }
                            }}
                            disabled={!AuthentificationServiceSingleton.isAdmin}
                            className="form-control" 
                            placeholder="prix unitaire"
                        />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                        <input 
                            type="number" 
                            step={1}
                            value={props.productOrder.quantity}
                            onChange={(e) => {entry.quantity = +e.target.value; updatePrice(); if(props.editEntry) props.editEntry(props.index, entry);}}
                            className="form-control" 
                            placeholder="quantité"
                        />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                        <input 
                            type="number"
                            step={0.01}
                            onChange={(e) => {updatePrice(+e.target.value); if(props.editEntry) props.editEntry(props.index, entry);}}
                            value={props.productOrder.price} 
                            className="form-control" 
                            placeholder="prix"
                        />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                        <div className="row">
                            <a className="col-lg-4 col-12" onClick={() => props.changePosition!(props.index, props.index -1)}><img src={upArrowImg} /></a>
                            <a className="col-lg-4 col-12" onClick={() => props.changePosition!(props.index, props.index +1)}><img src={downArrowImg} /></a>
                            <a className="col-lg-4 col-12" onClick={() => props.onDelete!(props.index)}><img src={thrashImg} width={16} height={16} /></a>
                        </div>
                    </td>
                    
                </>
                : <>
                    <th scope="row">{props.index}</th>
                    <td>{props.productOrder.product.title}</td>
                    <td>{props.productOrder.unitPrice.toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false})}</td>
                    <td>{props.productOrder.quantity}</td>
                    <td>{props.productOrder.price.toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false})}</td>
                </>
            }
        </tr>
    )
}

export default ProductRandoOrderCard;