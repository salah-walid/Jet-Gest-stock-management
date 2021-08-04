import { FC } from "react";
import editImg from "../../assets/images/edit.png"
import trashImg from "../../assets/images/trash-bin.png"
import { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import placeHolder from "../../assets/images/placeholder.png";
import Routes from "../../core/managers/routes";
import SubCategory from "../../core/models/SubCategory";

interface Props{
    subCategory: SubCategory;
    onDelete: (id: number | null | undefined) => void
}


const SubCategoryCard : FC<Props> = (props) => {
    return (
        <div className="card">
            <img className="card-img-top subCatImg" src={props.subCategory.image?.toString() ?? placeHolder} />
            <div className="card-body">
                <h5 className="card-title">{props.subCategory.title}</h5>
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                {
                    AuthentificationServiceSingleton.isAdmin
                    ? <div className="row">
                        <a className="btn btn-white col" onClick={(e) => {e.stopPropagation(); Routes.navigator.push(Routes.subCategoryForm + "/" + props.subCategory.id)}}>
                            <img src={editImg} className="btn-image"></img>
                        </a>
                        <a className="btn btn-white col" onClick={(e) => {
                                    e.stopPropagation(); 
                                    props.onDelete(props.subCategory.id);
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

export default SubCategoryCard;