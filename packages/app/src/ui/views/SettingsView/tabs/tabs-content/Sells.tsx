import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default class SellsSettings extends Component {
    render() {
        return (
            <Form>
                {/* Devis */}
                <Form.Group controlId="numbering.sells.devis">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Devis</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Devis préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Devis" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Commande */}
                <Form.Group controlId="numbering.sells.providerOrder">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Commande</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Commande préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Commande" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Bon de livraison */}
                <Form.Group controlId="numbering.sells.deliverybill">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Bon de livraison</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Bon de livraison préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Bon de livraison" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Bon de retour */}
                <Form.Group controlId="numbering.sells.returnbill">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Bon de retour</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Bon de retour préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Bon de retour" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Facture */}
                <Form.Group controlId="numbering.sells.bill">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Facture</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Facture préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Facture" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Avoir */}
                <Form.Group controlId="numbering.sells.avoir">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Avoir</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Avoir préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Avoir" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Facture d'acompte */}
                <Form.Group controlId="numbering.sells.accountBill">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Facture d'acompte</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Facture d'acompte préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Facture d'acompte" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Bon de livraison */}
                <Form.Group controlId="numbering.sells.avoirAcoount">
                    <Row>
                        <Col xl="2" sm="auto"><Form.Label>Avoir d'acompte</Form.Label></Col>
                        <Col xl="auto">
                            <Form.Control type="text" placeholder="Avoir d'acompte préfix" />
                        </Col>
                        <Col xl="auto">
                            <Form.Control type="number" placeholder="Avoir d'acompte" />
                        </Col>
                        <Col xl="auto">
                            <Form.Check type="checkbox" label="Utiliser le compteur" />
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        )
    }
}
