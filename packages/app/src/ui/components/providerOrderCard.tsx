import { FC } from "react";
import Routes from "../../core/managers/routes";

import editImg from "../../assets/images/edit.png"
import trashImg from "../../assets/images/trash-bin.png"
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import ProviderOrder from "../../core/models/providerOrder";

interface Props{
    providerOrder: ProviderOrder;
    onDelete: (id: number | null | undefined) => void
}

const ProviderOrderCard : FC<Props> = (props) => {
    return (
        <div className="card mb-3" onClick={() => Routes.navigator.push(`${Routes.providerOrder}/${props.providerOrder.id}`)} >
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col">
                        <h5 className="card-title col display-5 text-nowrap">PF{props.providerOrder.orderNumber}</h5>
                        <div className="row">
                            <p className="col-xl col-12 fs-4 text-nowrap">
                                Date : {props.providerOrder.creationDate}
                            </p>
                            <p className="col-xl col-12 fs-4 text-nowrap">
                                Total : {props.providerOrder.total} DA
                            </p>
                        </div>
                    </div>

                    {
                        AuthentificationServiceSingleton.isAdmin
                        ? <div className="col-2">
                            <span className="flex-d">
                                <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.providerOrderForm + "/" + props.providerOrder.id)}} >
                                    <img src={editImg} className="btn-image"></img>
                                </a>
                                <a className="btn btn-white" onClick={(e) => {
                                        e.stopPropagation(); 
                                        props.onDelete(props.providerOrder.id);
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

export default ProviderOrderCard;