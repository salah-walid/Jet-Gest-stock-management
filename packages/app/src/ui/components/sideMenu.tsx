import React, {Component} from "react";
import * as fa from "@fortawesome/free-solid-svg-icons";

import DashboardImg from "../../assets/images/dashboard.png";
import PackagesImg from "../../assets/images/packages.png";
import CashierImg from "../../assets/images/cashier-machine.png";
import costumerImg from "../../assets/images/customer.png";
import userImg from "../../assets/images/user.png";
import providerImg from '../../assets/images/help.png';
import categoryImg from '../../assets/images/category.png';
import PieceFournisseurImg from '../../assets/images/piece.png';
import BonPourImg from '../../assets/images/invoice.png';

import Routes from "../../core/managers/routes";
import AuthentificationService, { AuthentificationServiceSingleton } from "../../core/services/authentificationService";
import { Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

interface Props{
    isOpen: boolean;
    toggle: () => void;
}

class SideMenu extends Component<Props> {

    private _authentificationService : AuthentificationService = AuthentificationServiceSingleton;

    render(){
        return (
            <div className={`sidebar ${this.props.isOpen ? "is-open" : ""}`}>
                <div className="sidebar-header">
                    <Button
                        variant="link"
                        onClick={this.props.toggle}
                        style={{ color: "#fff" }}
                        className="mt-4"
                    >
                        <FontAwesomeIcon icon={fa.faTimes} pull="right" size="xs" />
                    </Button>
                    <h3 className="mb-4 text-center text-primary display-6">
                        JET-GEST
                    </h3>
                </div>
                
                <Nav className="flex-column pt-2">
                    <Nav.Item>
                        <LinkContainer to={Routes.gestionPage}>
                            <Nav.Link>
                                <img src={PackagesImg} className="side-menu-btn-image" />
                                Gestion de stock
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.category}>
                            <Nav.Link>
                                <img src={categoryImg} className="side-menu-btn-image" />
                                Catégories
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.order}>
                            <Nav.Link>
                                <img src={CashierImg} className="side-menu-btn-image" />
                                Factures
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.clients}>
                            <Nav.Link>
                                <img src={costumerImg} className="side-menu-btn-image" />
                                Clients
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.provider}>
                            <Nav.Link>
                                <img src={providerImg} className="side-menu-btn-image" />
                                Fournisseurs
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.providerOrder}>
                            <Nav.Link>
                                <img src={PieceFournisseurImg} className="side-menu-btn-image" />
                                Pièces Fournisseurs
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                        <LinkContainer to={Routes.orderRando}>
                            <Nav.Link>
                                <img src={BonPourImg} className="side-menu-btn-image" />
                                Bon Pour
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <div className="nav-spacer-big" />

                    <Nav.Item>
                        <LinkContainer to={Routes.userPage}>
                            <Nav.Link>
                                <img src={userImg} className="side-menu-btn-image" />
                                Utilisateur
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                </Nav>
            </div>
        );
    }
    
}

export default SideMenu;