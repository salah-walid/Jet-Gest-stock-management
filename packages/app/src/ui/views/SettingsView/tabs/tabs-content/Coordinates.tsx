import React, { Component } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default class CoordinatesSettings extends Component {
    render() {
        return (
            <Container>
                <Form>
                    <fieldset>
                        <legend>Identification</legend>
                        {/* Forme juridique */}
                        <Form.Group controlId="company.coords.identification.jur">
                            <Row>
                                <Col xs="3"><Form.Label>Forme juridique ou civilité</Form.Label></Col>
                                <Col>
                                    <Form.Control className="form-select" as="select" defaultValue="">
                                        <option value="">...</option>
                                        <option value="SARL"> SARL </option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* Nom */}
                        <Form.Group controlId="company.coords.identification.name">
                            <Row>
                                <Col xs="3"><Form.Label>Nom - Raison sociale</Form.Label></Col>
                                <Col><Form.Control type="text" placeholder="Nom - Raison sociale" /></Col>
                            </Row>
                        </Form.Group>

                        {/* Civilité du contact */}
                        <Form.Group controlId="company.coords.identification.civ">
                            <Row>
                                <Col xs="3"><Form.Label>Civilité du contact</Form.Label></Col>
                                <Col>
                                    <Form.Control className="form-select" as="select" defaultValue="">
                                        <option value="">...</option>
                                        <option value="Mr"> Mr </option>
                                        <option value="Mme"> Mme </option>
                                        <option value="Mlles"> Mlles </option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* Nom du contact */}
                        <Form.Group controlId="company.coords.identification.nameContact">
                            <Row>
                                <Col xs="3"><Form.Label>Nom du contact</Form.Label></Col>
                                <Col><Form.Control type="text" placeholder="Nom du contact" /></Col>
                            </Row>
                        </Form.Group>

                        {/* Qualité de la personne */}
                        <Form.Group controlId="company.coords.identification.personQ">
                            <Row>
                                <Col xs="3"><Form.Label>Qualité de la personne</Form.Label></Col>
                                <Col><Form.Control type="text" placeholder="Qualité de la personne" /></Col>
                            </Row>
                        </Form.Group>
                    </fieldset>

                    <fieldset>
                        <legend>Adresse de la société</legend>

                        {/* adresse */}
                        <Form.Group controlId="company.coords.adress.adress">
                            <Row>
                                <Col xs="3"><Form.Label>Adresse</Form.Label></Col>
                                <Col><Form.Control as="textarea" rows={4} placeholder="Adresse" /></Col>
                            </Row>
                        </Form.Group>

                        <Row>
                            <Col lg="auto" xs="12">
                                <Form.Group controlId="company.coords.adress.postalCode">
                                    <Row>
                                        <Col lg="auto"><Form.Label>Code postal</Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Code postal" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="company.coords.adress.town">
                                    <Row>
                                        <Col lg="auto"><Form.Label>Ville </Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Ville" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="auto" xs="12">
                                <Form.Group controlId="company.coords.adress.departement">
                                    <Row>
                                        <Col lg="auto" ><Form.Label>Département</Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Département" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="company.coords.adress.country">
                                    <Row>
                                        <Col lg="auto"><Form.Label>Pays </Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Pays" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                    </fieldset>

                    <fieldset>
                        <legend>Autres informations</legend>

                        <Row>
                            <Col xl="6" lg="12">
                                <Form.Group controlId="company.coords.other.fixtel">
                                    <Row>
                                        <Col lg="auto" ><Form.Label>Téléphone fixe</Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Téléphone fixe" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>

                            <Col xl="6" lg="12">
                                <Form.Group controlId="company.coords.adress.telfax">
                                    <Row>
                                        <Col lg="auto"><Form.Label>Télécopie / Fax </Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Téléphone/Fax" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl="6" lg="12">
                                <Form.Group controlId="company.coords.other.cellphone">
                                    <Row>
                                        <Col lg="auto" ><Form.Label>Téléphone portable</Form.Label></Col>
                                        <Col><Form.Control type="text" placeholder="Téléphone portable" /></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="company.coords.other.email">
                            <Row>
                                <Col lg="auto" ><Form.Label>e-mail</Form.Label></Col>
                                <Col><Form.Control type="email" placeholder="email" /></Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId="company.coords.other.website">
                            <Row>
                                <Col lg="auto" ><Form.Label>Site web</Form.Label></Col>
                                <Col><Form.Control type="text" placeholder="Site web" /></Col>
                            </Row>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Container>
        )
    }
}
