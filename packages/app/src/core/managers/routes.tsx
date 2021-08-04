import {Component} from 'react';
import {
  Switch,
  Route,
  Router,
} from "react-router-dom";
import {createHashHistory, History} from "history";

import Login from '../../ui/views/Login'
import { ConnectedProtectedRoute, NotConnectedProtectedRoute } from './protectedRoute';
import AuthentificationService, { AuthentificationServiceSingleton } from '../services/authentificationService';
import { SocketServiceSingelton } from '../services/WebSocketService';
import SettingsPage from '../../ui/views/SettingsView/SettingsPage';
import { ElectronComServiceSingleton } from '../services/ElectronComService';
import MainRoutes from './mainRoutes';

interface State{
  ready: boolean;
}

class Routes extends Component<{}, State>{

  constructor(props: any){
    super(props);

    this.state  = {
      ready : false,
    };
  }

  componentDidMount() {
      this.loadData();
  }

  async loadData(){
    this.setState({ready : false});

    let authService : AuthentificationService = AuthentificationServiceSingleton;
    authService.loadLocalToken();
    await authService.getUser();

    SocketServiceSingelton.setup();
    ElectronComServiceSingleton.init();

    this.setState({ready : true});
  }

  static homePage: string = "/";
  static gestionPage: string = "/gestion";
  static productDetail: string = "/gestion/product";
  static productForm: string = "/productform";

  static userPage: string = "/userInfo";
  static userForm: string = "/userForm"
  
  static clients: string = "/clients";
  static clientForm: string = "/clientForm";

  static provider: string = "/provider";
  static providerForm: string = "/providerForm";

  static category: string = "/category";
  static categoryForm : string = "/categoryForm";
  static subCategoryForm : string = "/subCategoryForm";

  static providerOrder : string = "/providerOrder";
  static providerOrderForm : string = "/providerOrderForm";

  static order : string = "/order";
  static orderForm : string = "/orderForm";

  static orderRando : string = "/orderRando";
  static orderRandoForm : string = "/orderRandoForm";

  static settingsPage : string = "/settings";

  static navigator: History = createHashHistory();

  render(){
    if(!this.state.ready){
      return (
        <div className="bg-primary">
          
        </div>
      )
    }

    return (
        <Router history={Routes.navigator}>
          <Switch>
            <NotConnectedProtectedRoute path={Routes.homePage} exact component={Login} redirectTo={Routes.gestionPage} />

            <ConnectedProtectedRoute  redirectTo={Routes.homePage}>
              <Switch>
                <Route path={`${Routes.settingsPage}/:selected`} component={SettingsPage} />
                <Route>
                  <MainRoutes />
                </Route>
              </Switch>
            </ConnectedProtectedRoute>

            <Route path="*">
              404 not found
            </Route>
          </Switch>
        </Router>
    );
  }
}
  
export default Routes;