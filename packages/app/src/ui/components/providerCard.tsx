import { FC } from "react";
import Routes from "../../core/managers/routes";

import editImg from "../../assets/images/edit.png"
import trashImg from "../../assets/images/trash-bin.png"
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import ProviderData from "../../core/models/provider";

interface Props{
    provider: ProviderData;
    onDelete: (id: number | null | undefined) => void
    onClick: () => void;
}

const ProviderCard : FC<Props> = (props) => {
    return (
        <div className="card mb-3" onClick={() => props.onClick()} >
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col">
                        <h5 className="card-title col display-5 text-nowrap">{props.provider.name} {props.provider.lastName}</h5>
                        <p className="col-lg-2 col-sm-6 fs-4 text-nowrap">
                            {props.provider.city}
                        </p>
                    </div>

                    {
                        AuthentificationServiceSingleton.isAdmin
                        ? <div className="col-2">
                            <span className="flex-d">
                                <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.providerForm + "/" + props.provider.id)}}>
                                    <img src={editImg} className="btn-image"></img>
                                </a>
                                <a className="btn btn-white" onClick={(e) => {
                                        e.stopPropagation(); 
                                        props.onDelete(props.provider.id);
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

export default ProviderCard;