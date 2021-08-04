import { observer } from 'mobx-react';
import {Component, createRef} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import closeImg from "../../../assets/images/close.png";
import checkImg from "../../../assets/images/check.png";
import Routes from '../../../core/managers/routes';
import FormType from '../../../core/models/formType';
import placeHolder from "../../../assets/images/placeholder.png";
import SubCategoryFormViewModel from '../../viewmodels/categoriesViewModels/subCategoryFormViewModel';


interface Props extends RouteComponentProps<{id?: string}>{
    
}

class SubCategoryForm extends Component<Props> {

    vm: SubCategoryFormViewModel = new SubCategoryFormViewModel();
    public imageFile;

    constructor(props: Props){
        super(props);

        this.vm.init(props.match.params.id);
        this.imageFile = createRef<HTMLInputElement>();
    }

    render() {
        return (
            <div className='container-fluid productForm'>

                <div className="my-4">
                    <h1 className="display-1 text-center mb-5">
                        {
                            this.vm.formType === FormType.new
                            ? "Nouvelle sous catégorie"
                            : "Modifier sous catégorie"
                        }
                    </h1>

                    <form className="g-3 needs-validation" ref={this.vm.formRef} onSubmit={this.vm.submit} noValidate>
                        <table className="table table-borderless">
                            <tbody>
                                {/* title */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="titleForm" className="form-label">Titre : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="title"
                                                value={this.vm.subCategory.title}
                                                onChange={(e) => {this.vm.subCategory.title = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="titleForm" 
                                                pattern=".{6,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir un titre valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* image */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="imageForm" className="form-label">Image : </label>
                                    </th>
                                    <td> 
                                        <div>
                                            <div className="mb-4 position-relative" >
                                                <img className="input-img" src={this.vm.subCategory.image?.toString() ?? placeHolder} onClick={(e) => {e.preventDefault(); this.imageFile.current?.click();}} />
                                                <div className="button_class">
                                                    <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); this.vm.deleteImg()}}> <img className="btn-image" src={closeImg}/> </a>
                                                </div>
                                            </div>

                                            <div className="col input-group has-validation">
                                                <input
                                                    type="file"
                                                    ref={this.imageFile}
                                                    style={{display: "none"}}
                                                    accept="image/png, image/jpeg"
                                                    onChange={(e) => {this.vm.fileChanged(e.target.files);}}
                                                    className="form-control"
                                                    name="image"
                                                    id="imageForm"
                                                />
                                                <div className="invalid-feedback">
                                                    Veuillez choisir une image.
                                                </div>
                                                <div className="valid-feedback">
                                                    Valide
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="row my-5">
                            <span className="col"></span>

                            <a className="col-2 btn btn-seconday border fs-6 text-left text-primary" onClick={(e) => Routes.navigator.goBack()} >
                                <img src={closeImg} className="btn-image"></img> Annuler
                            </a>

                            <span className="col-1"></span>

                            <button type="submit" className="col-2 btn btn-primary fs-6 text-left text-white">
                                <img src={checkImg} className="btn-image"></img> Confirmer
                            </button>
                        </div>
                    </form>
                
                    

                </div>

            </div>
        )
    }
}

export default observer(SubCategoryForm)
