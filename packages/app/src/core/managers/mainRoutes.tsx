import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SideMenu from '../../ui/components/sideMenu'
import Routes from './routes'
import { AdminProtectedRoute } from './protectedRoute';

import Clients from '../../ui/views/clientViews/clients';
import clientDetail from '../../ui/views/clientViews/clientDetail';
import clientForm from '../../ui/views/clientViews/clientForm';
import provider from '../../ui/views/providerViews/provider';
import providerDetail from '../../ui/views/providerViews/providerDetail';
import providerForm from '../../ui/views/providerViews/providerForm';
import CategoryPage from '../../ui/views/categoryViews/categoryView';
import categoryForm from '../../ui/views/categoryViews/categoryForm';
import subCategoryForm from '../../ui/views/categoryViews/subCategoryForm';
import providerOrder from '../../ui/views/providerOrderViews/providerOrder';
import providerOrderDetail from '../../ui/views/providerOrderViews/providerOrderDetail';
import ProviderOrderForm from '../../ui/views/providerOrderViews/providerOrderForm';
import Order from '../../ui/views/orderViews/Order';
import OrderDetail from '../../ui/views/orderViews/OrderDetail';
import OrderForm from '../../ui/views/orderViews/OrderForm';
import Gestion from '../../ui/views/gestionViews/gestion'
import productDetail from '../../ui/views/gestionViews/productDetail';
import ProductForm from '../../ui/views/gestionViews/productForm';
import UserPage from '../../ui/views/userViews/user';
import UserForm from '../../ui/views/userViews/userForm';
import { Button, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import OrderRando from '../../ui/views/orderRando/OrderRando';
import OrderRandoDetail from '../../ui/views/orderRando/OrderRandoDetail';
import OrderRandoForm from '../../ui/views/orderRando/OrderRandoForm';

interface State{
    isOpen: boolean;
    isMobile: boolean;
}

export default class MainRoutes extends Component<{}, State> {

    private previousWidth: number = -1;

    constructor(props: any){
        super(props);

        this.state = {
            isOpen: false,
            isMobile: true
        };
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 850;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;
    
        if (isMobile !== wasMobile) {
          this.setState({
            isOpen: !isMobile
          });
        }
    
        this.previousWidth = width;
      }
    
    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    

    render() {
        return (
            <div className="mainWindow">
                <SideMenu  toggle={this.toggle} isOpen={this.state.isOpen} />
                <article className={`content w-100 ${this.state.isOpen ? "is-open" : ""}`}>

                <Navbar
                    className="navbar shadow-sm p-3 mb-5 bg-white rounded"
                    expand
                >
                    <Button variant="outline-info" onClick={() => {if(Routes.navigator.length > 0) Routes.navigator.goBack();}}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>

                    <Button variant="outline-info" onClick={() => this.toggle()}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                </Navbar>

                    <Route path={Routes.gestionPage} exact component={Gestion} />
                    <Route path={`${Routes.productDetail}/:id(\\d+)`} component={productDetail} />
                    <Route path={Routes.productForm} exact component={ProductForm} />
                    <Route path={`${Routes.productForm}/:id(\\d+)`} component={ProductForm}/>
                    
                    <Route path={Routes.clients} exact component={Clients} />
                    <Route path={`${Routes.clients}/:id(\\d+)`} component={clientDetail} />
                    <Route path={Routes.clientForm} exact component={clientForm} />
                    <Route path={`${Routes.clientForm}/:id(\\d+)`} component={clientForm} />
                    
                    <Route path={Routes.provider} exact component={provider} />
                    <Route path={`${Routes.provider}/:id(\\d+)`} component={providerDetail} />
                    <Route path={Routes.providerForm} exact component={providerForm} />
                    <Route path={`${Routes.providerForm}/:id(\\d+)`} component={providerForm} />
                    
                    <Route path={Routes.category} exact component={CategoryPage} />
                    <Route path={Routes.categoryForm} exact component={categoryForm} />
                    <Route path={`${Routes.categoryForm}/:id(\\d+)`} exact component={categoryForm} />
                    <Route path={Routes.subCategoryForm} exact component={subCategoryForm} />
                    <Route path={`${Routes.subCategoryForm}/:id(\\d+)`} exact component={subCategoryForm} />
                    
                    <Route path={Routes.providerOrder} exact component={providerOrder} />
                    <Route path={`${Routes.providerOrder}/:id(\\d+)`} exact component={providerOrderDetail} />
                    <Route path={Routes.providerOrderForm} exact component={ProviderOrderForm} />
                    <Route path={`${Routes.providerOrderForm}/:id(\\d+)`} exact component={ProviderOrderForm} />
                    
                    <Route path={Routes.order} exact component={Order} />
                    <Route path={`${Routes.order}/:id(\\d+)`} exact component={OrderDetail} />
                    <Route path={Routes.orderForm} exact component={OrderForm} />
                    <Route path={`${Routes.orderForm}/:id(\\d+)`} exact component={OrderForm} />

                    <Route path={Routes.orderRando} exact component={OrderRando} />
                    <Route path={`${Routes.orderRando}/:id(\\d+)`} exact component={OrderRandoDetail} />
                    <Route path={Routes.orderRandoForm} exact component={OrderRandoForm} />
                    <Route path={`${Routes.orderRandoForm}/:id(\\d+)`} exact component={OrderRandoForm} />
            
                    <Route path={Routes.userPage} exact component={UserPage} />
                    <AdminProtectedRoute path={Routes.userForm} exact component={UserForm} redirectTo={Routes.userPage} />
                    <AdminProtectedRoute path={`${Routes.userForm}/:id(\\d+)`} component={UserForm} redirectTo={Routes.userPage} />
                </article>
            </div>
        )
    }
}
