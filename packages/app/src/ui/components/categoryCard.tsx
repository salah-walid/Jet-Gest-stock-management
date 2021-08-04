import { FC } from "react";
import Category from "../../core/models/Category";
import editImg from "../../assets/images/edit.png";
import trashImg from "../../assets/images/trash-bin.png";
import placeHolder from "../../assets/images/placeholder.png";
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import Routes from "../../core/managers/routes";

interface Props{
    category: Category;
    onDelete: (id: number | null | undefined) => void
}


const CategoryCard : FC<Props> = (props) => {

    return (
        <div className="card">
            <img className="card-img-top catImg" src={props.category.image?.toString() ?? placeHolder} />
            <div className="card-body">
                <h5 className="card-title">{props.category.title}</h5>
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                {
                    AuthentificationServiceSingleton.isAdmin
                    ? <div className="row">
                        <a className="btn btn-white col" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.categoryForm + "/" + props.category.id)}}>
                            <img src={editImg} className="btn-image"></img>
                        </a>
                        <a className="btn btn-white col" onClick={(e) => {
                                e.stopPropagation(); 
                                props.onDelete(props.category.id);
                            }
                        }>
                            <img src={trashImg} className="btn-image"></img>
                        </a>
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
}

export default CategoryCard;