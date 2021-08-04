import { observer } from "mobx-react";
import {Component} from "react";

import UserPageViewModel from "../../viewmodels/userViewModels/userPageViewModel";
import editImg from "../../../assets/images/edit.png";
import closeImg from "../../../assets/images/close.png";
import { hasAdminPrivileges } from "../../../core/models/UserData";
import Routes from "../../../core/managers/routes";

class UserPage extends Component{

    public vm: UserPageViewModel = new UserPageViewModel();

    constructor(props: any){
        super(props);

        this.vm.init();
    }

    render(){

        return (
            <div className='container-fluid'>
                <div className="my-4">
                    <div className="container justify-content-center">
                        {
                            this.vm.userIsLoading || this.vm.user === null
                            ? <div className="display-2">
                                Chargement
                            </div>
                            : <div>
                                <header className="my-4 display-3 text-center">
                                vous êtes connecté en tant que {this.vm.user.username}
                                </header>

                                {
                                    hasAdminPrivileges(this.vm.user)
                                    ? <div>
                                        <p className="fs-4 my-4 text-center text-primary">
                                            Utilisateur admin
                                        </p>

                                        <div className="row my-4 justify-content-center align-items-center">
                                            <select className="form-select col-lg col-12" name="subCategories" onChange={(e) => {this.vm.chosenUserId = e.target.value}} value={this.vm.chosenUserId} aria-label="select multiple example">
                                                {
                                                    this.vm.users.map(
                                                        (item) => {
                                                            return (
                                                                <option value={item.id?.toString()} key={item.id} >{item.username}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>

                                            <button className="col-lg-2 col-12 offset-lg-1 offset-0 my-4 btn btn-seconday border fs-6 text-left text-primary" onClick={(e) => Routes.navigator.push(`${Routes.userForm}/${this.vm.chosenUserId}`)} >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                    : <></>
                                }

                                <div className="row">

                                    {
                                        hasAdminPrivileges(this.vm.user)
                                        ? <>
                                            <button className="col-sm col-12 btn btn-seconday border fs-6 text-left" onClick={(e) => Routes.navigator.push(`${Routes.userForm}/`)}>
                                                Nouveau compte
                                            </button>

                                            <button className="col-sm col-12 offset-sm-1 offset-0 btn btn-seconday border fs-6 text-left" onClick={(e) => Routes.navigator.push(`${Routes.userForm}/${this.vm.user?.id}`)}>
                                                <img src={editImg} className="btn-image"></img> Modifier ce compte
                                            </button>

                                            {/* <button className="col-sm col-12 offset-sm-1 offset-0 btn btn-primary fs-6 text-left">
                                                <img src={trashBinWhite} className="btn-image"></img> Supprimer
                                            </button> */}
                                        </>
                                        : <> </>
                                    }

                                    <button className="col-sm col-12 offset-sm-1 offset-0 btn btn-seconday border fs-6 text-left text-primary" onClick={(e) => this.vm.logout()}>
                                        <img src={closeImg} className="btn-image"></img> Déconnexion
                                    </button>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        );

    }

}

export default observer(UserPage)