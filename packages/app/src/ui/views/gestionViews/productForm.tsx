import { observer } from 'mobx-react';
import {Component, createRef} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProductFormViewModel from '../../viewmodels/gestionViewModels/productFormViewModel';

import closeImg from "../../../assets/images/close.png";
import checkImg from "../../../assets/images/check.png";
import placeHolder from "../../../assets/images/placeholder.png";
import Routes from '../../../core/managers/routes';
import FormType from '../../../core/models/formType';


interface Props extends RouteComponentProps<{id?: string}>{}

class ProductForm extends Component<Props> {

    vm: ProductFormViewModel = new ProductFormViewModel();
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
                            ? "Nouveau produit"
                            : "Modifier produit"
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
                                                value={this.vm.product.title}
                                                onChange={(e) => {this.vm.product.title = e.target.value; this.vm.inputChanged(e)}} 
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

                                {/* description */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="descriptionForm" className="form-label">Description : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <textarea
                                                onChange={(e) => {this.vm.product.description = e.target.value; this.vm.inputChanged(e)}}
                                                value={this.vm.product.description}
                                                className="form-control"
                                                name="description"
                                                id="descriptionForm" 
                                                rows={6} 
                                                required 
                                            >
                                                
                                            </textarea>
                                            <div className="invalid-feedback">
                                                Veuillez choisir une description valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* forcePrice */}
                                <tr className="">
                                    <th scope="row">
                                        <label htmlFor="forceForm" className="form-check-label">Forcer un prix : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group container">
                                            <input 
                                                type="checkbox" 
                                                checked={this.vm.product.forcePrice}
                                                onChange={(e) => {this.vm.product.forcePrice = e.target.checked;}} 
                                                className="form-check-input"
                                                name="force"
                                                id="forceForm"  
                                            />
                                        </div>
                                    </td>
                                </tr>

                                {/* price */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="priceForm" className="form-label">Prix : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="number" 
                                                min={0}
                                                value={this.vm.product.price}
                                                onChange={(e) => {this.vm.product.price = +e.target.value; this.vm.inputChanged(e)}}  
                                                className="form-control"
                                                name="price"
                                                id="priceForm"
                                                step=".01"
                                                disabled={!this.vm.product.forcePrice}
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir un prix valide.
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
                                                <img className="input-img" src={this.vm.product.image?.toString() ?? placeHolder} onClick={(e) => {e.preventDefault(); this.imageFile.current?.click();}} />
                                                <div className="button_class">
                                                    <a className="btn btn-white" onClick={(e) => {e.stopPropagation(); this.vm.deleteImg()}}> <img className="btn-image" src={closeImg}/> </a>
                                                </div>
                                            </div>

                                            <div className="input-group has-validation">
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

                                {/* category */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="catForm" className="form-label">Catégories : </label>
                                    </th>

                                    <td>
                                        <div className="input-group">
                                            <select className="form-select" name="categories" onChange={this.vm.catSubsChanged} value={Array.from(this.vm.product.categories, item => item.id?.toString() ?? "")} multiple id="catForm" aria-label="select multiple example">
                                                {
                                                    this.vm.catsAndSubs.categories.map(
                                                        (item) => {
                                                            return (
                                                                <option value={item.id?.toString()} key={item.id} >{item.title}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Veuillez choisir une catégorie valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* Sub category */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="subCatForm" className="form-label">Sous Catégories : </label>
                                    </th>

                                    <td>
                                        <div className="input-group">
                                            <select className="form-select" name="subCategories" onChange={this.vm.catSubsChanged} value={Array.from(this.vm.product.subCategories, item => item.id?.toString() ?? "")} multiple id="subCatForm" aria-label="select multiple example">
                                                {
                                                    this.vm.catsAndSubs.subCategory.map(
                                                        (item) => {
                                                            return (
                                                                <option value={item.id?.toString()} key={item.id} >{item.title}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Veuillez choisir une sous catégorie valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
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

export default observer(ProductForm)
