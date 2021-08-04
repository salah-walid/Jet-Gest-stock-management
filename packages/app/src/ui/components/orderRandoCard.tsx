import { FC } from "react";
import Routes from "../../core/managers/routes";

import editImg from "../../assets/images/edit.png"
import trashImg from "../../assets/images/trash-bin.png"
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import OrderData from "../../core/models/orderData";
import OrderRandoData from "../../core/models/orderRandoData";

interface Props{
    order: OrderRandoData;
    onDelete: (id: number | null | undefined) => void
}

const OrderRandoCard : FC<Props> = (props) => {
    return (
        <div className="card mb-3" onClick={() => Routes.navigator.push(`${Routes.orderRando}/${props.order.id}`)} >
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col">
                        <h5 className="card-title col display-5 text-nowrap">BP{props.order.orderNumber}</h5>
                        <div className="row">
                            <p className="col-xl col-12 fs-4 text-nowrap">
                                Date : {props.order.creationDate}
                            </p>
                            <p className="col-xl col-12 fs-4 text-nowrap">
                                Total : {props.order.total} DA
                            </p>
                        </div>
                    </div>

                    {
                        AuthentificationServiceSingleton.isAdmin
                        ? <div className="col-2">
                            <span className="flex-d">
                                <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.orderRandoForm + "/" + props.order.id)}} >
                                    <img src={editImg} className="btn-image"></img>
                                </a>
                                <a className="btn btn-white" onClick={(e) => {
                                        e.stopPropagation(); 
                                        props.onDelete(props.order.id);
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

export default OrderRandoCard;