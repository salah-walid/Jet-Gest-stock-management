import { observer } from 'mobx-react';
import {Component} from 'react';
import LoginViewModel from '../viewmodels/loginViewModel'
import logoImg from '../../assets/images/Icon.png'

class Login extends Component {

    vm : LoginViewModel = new LoginViewModel();

    render(){
        return (
            <div className="h-100 d-flex justify-content-center align-items-center">
                
                <form className="login" onSubmit={this.vm.connect}>
                    <h1 className="mb-4 text-center text-primary display-2">
                        <p>
                            <img src={logoImg} alt="" className="text-center" />
                        </p>
                        Jet Gest
                    </h1>
    
                    <div className="mb-3">
                        <input type="text" name="user" className="form-control" id="usernameField" value={this.vm.user} onChange={this.vm.handleInputChange} aria-describedby="UtilisateurHelp" placeholder="Utilisateur" />
                        <div id="UtilisateurHelp" className="form-text">Utilisateur.</div>
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" id="passwordField" value={this.vm.password} onChange={this.vm.handleInputChange} aria-describedby="PasswordHelp" placeholder="Mot de passe" />
                        <div id="PasswordHelp" className="form-text">Mot de passe.</div>
                    </div>
    
                    <div className="row">
                        <div className="col text-center">
                            <button type="submit" className="btn btn-primary fs-4 px-5 py-1">CONNEXTION</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default observer(Login)