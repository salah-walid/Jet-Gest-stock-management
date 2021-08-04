import { observer } from 'mobx-react';
import {Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import closeImg from "../../../assets/images/close.png";
import checkImg from "../../../assets/images/check.png";
import Routes from '../../../core/managers/routes';
import FormType from '../../../core/models/formType';
import ClientFormViewModel from '../../viewmodels/clientViewModel/clientFormViewModel';


interface Props extends RouteComponentProps<{id?: string}>{
    
}

class ClientForm extends Component<Props> {

    vm: ClientFormViewModel = new ClientFormViewModel();

    constructor(props: Props){
        super(props);

        this.vm.init(props.match.params.id);
    }

    render() {
        return (
            <div className='container-fluid productForm'>

                <div className="my-4">
                    <h1 className="display-1 text-center mb-5">
                        {
                            this.vm.formType === FormType.new
                            ? "Nouveau client"
                            : "Modifier client"
                        }
                    </h1>

                    <form className="g-3 needs-validation" ref={this.vm.formRef} onSubmit={this.vm.submit} noValidate>
                        <table className="table table-borderless">
                            <tbody>
                                {/* name */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="nameForm" className="form-label">Nom : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="name"
                                                value={this.vm.client.name}
                                                onChange={(e) => {this.vm.client.name = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="nameForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir un nom valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* last name */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="lastNameForm" className="form-label">Prénom : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="lastName"
                                                value={this.vm.client.lastName}
                                                onChange={(e) => {this.vm.client.lastName = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="lastNameForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir un Prénom valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* adress */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="adressForm" className="form-label">Adresse : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <textarea 
                                                name="adress"
                                                value={this.vm.client.adress}
                                                onChange={(e) => {this.vm.client.adress = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="adressForm"
                                                required 
                                            >
                                            </textarea>
                                            <div className="invalid-feedback">
                                                Veuillez choisir une adresse valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* city */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="cityForm" className="form-label">Ville : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="city"
                                                value={this.vm.client.city}
                                                onChange={(e) => {this.vm.client.city = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="cityForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir une ville valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* nMF */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="NMFForm" className="form-label">N°MF : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="nMF"
                                                value={this.vm.client.nMF}
                                                onChange={(e) => {this.vm.client.nMF = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="NMFForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir une N°MF valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* nRC */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="NRCForm" className="form-label">N°RC : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="nRC"
                                                value={this.vm.client.nRC}
                                                onChange={(e) => {this.vm.client.nRC = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="NRCForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir une N°RC valide.
                                            </div>
                                            <div className="valid-feedback">
                                                Valide
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* nAI */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="NAIForm" className="form-label">N°AI : </label>
                                    </th>
                                    <td> 
                                        <div className="input-group has-validation">
                                            <input 
                                                type="text"
                                                name="nAI"
                                                value={this.vm.client.nAI}
                                                onChange={(e) => {this.vm.client.nAI = e.target.value; this.vm.inputChanged(e)}} 
                                                className="form-control" 
                                                id="NAIForm" 
                                                pattern=".{3,}" 
                                                required 
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez choisir une N°AI valide.
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

export default observer(ClientForm)
