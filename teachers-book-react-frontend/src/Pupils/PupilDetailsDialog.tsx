import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import InputText from '../Components/Controls/InputText';
import { PupilDetailsModalViewMode } from 'src/ViewModels/Pupils/PupilDetailsModalViewModel';

export interface IDialogProps { modalViewModel: PupilDetailsModalViewMode, selectedKlassName: string, addEvent?: any, updateEvent?: any }

class PupilDetailsDialog extends React.Component<IDialogProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
        
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalAdd = this.handleModalAdd.bind(this);
        this.handleModalUpdate = this.handleModalUpdate.bind(this);
        
        this.state = {
            toggleState: true,
            modalShow: false
        }
    }

    public handleModalClose() {
        this.setState({ modalShow: false });
    }

    public handleModalShow() {
        this.setState({ modalShow: true });
    }

    public handleModalAdd() {
        if(this.props.addEvent) {
            this.props.addEvent();
        }
        this.handleModalClose();
    }

    public handleModalUpdate() {
        if(this.props.updateEvent) {
            this.props.updateEvent();
        }
        this.handleModalClose();
    }
    
    public render() {
        return (
        <Modal show={this.state.modalShow} onHide={this.handleModalClose} key="Modal" size="lg">
            <Modal.Header closeButton={true}>
                <Modal.Title>Neuer Schüler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nachname</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilSurname} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Vorname</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilFirstname} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Adresse</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilAddress} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Postleitzahl</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilZipCode} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Stadt</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilCity} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-Mail</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilEmail} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Telefon</Form.Label>
                            <InputText data={this.props.modalViewModel.pupilPhone} />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>
                Schließen
                </Button>
                <Button variant="primary" onClick={ this.props.modalViewModel.update ? this.handleModalUpdate : this.handleModalAdd }>
                Speichern
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default PupilDetailsDialog;