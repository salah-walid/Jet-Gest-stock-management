import { observer } from "mobx-react";
import {Component} from "react";
import { RouteComponentProps } from "react-router-dom";
import FormType from "../../../core/models/formType";
import UserFormViewModel from "../../viewmodels/userViewModels/userFormViewModel";

import closeImg from "../../../assets/images/close.png";
import checkImg from "../../../assets/images/check.png";
import Routes from "../../../core/managers/routes";

interface Props extends RouteComponentProps<{id?: string}>{
    
}

class UserForm extends Component<Props>{

    public vm = new UserFormViewModel();

    constructor(props: Props){
        super(props);

        this.vm.init(props.match.params.id)
    }

    render(){
        return (
            <div className="container">
                <div className='container-fluid productForm'>

                    <div className="my-4">
                        <h1 className="display-1 text-center mb-5">
                            {
                                this.vm.formType === FormType.new
                                ? "Nouveau utilisateur"
                                : "Modifier utilisateur"
                            }
                        </h1>

                        <form className="g-3 needs-validation" ref={this.vm.formRef} onSubmit={this.vm.submit} noValidate>
                            <table className="table table-borderless">
                                <tbody>
                                    {/* userName */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="nameForm" className="form-label">Nom d'utilisateur : </label>
                                        </th>
                                        <td> 
                                            <div className="input-group has-validation">
                                                <input 
                                                    type="text"
                                                    name="name"
                                                    value={this.vm.user.username}
                                                    onChange={(e) => {this.vm.user.username = e.target.value; this.vm.inputChanged(e)}} 
                                                    className="form-control" 
                                                    id="nameForm" 
                                                    pattern=".{4,}" 
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

                                    {/* new password */}
                                    {
                                        this.vm.formType == FormType.update
                                        ? <tr className="">
                                            <th scope="row">
                                                <label htmlFor="newPassForm" className="form-check-label">Changer le mot de passe : </label>
                                            </th>
                                            <td> 
                                                <div className="input-group container">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={this.vm.newPass}
                                                        onChange={(e) => {this.vm.newPass = e.target.checked;}} 
                                                        className="form-check-input"
                                                        name="newPass"
                                                        id="newPassForm"  
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        : <> </>
                                    }

                                    {/* password */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="passForm" className="form-label">Mot de passe : </label>
                                        </th>
                                        <td> 
                                            <div className="input-group has-validation">
                                                <input 
                                                    type="password"
                                                    name="pass"
                                                    value={this.vm.password}
                                                    onChange={(e) => {this.vm.password = e.target.value; this.vm.inputChanged(e)}} 
                                                    className="form-control" 
                                                    id="passForm" 
                                                    disabled={!this.vm.newPass} 
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

                                    {/* Auth groups */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="subCatForm" className="form-label">Group d'autorisation : </label>
                                        </th>

                                        <td>
                                            <div className="input-group">
                                                <select className="form-select" name="subCategories" onChange={this.vm.authGroupChanged} value={Array.from(this.vm.user.authGroups, item => item.id.toString())} multiple id="subCatForm" aria-label="select multiple example">
                                                {
                                                        this.vm.groups.map(
                                                            (item) => {
                                                                return (
                                                                    <option value={item.id.toString()} key={item.id} >{item.name}</option>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </select>
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
            </div>
        )
    }

}

export default observer(UserForm)
