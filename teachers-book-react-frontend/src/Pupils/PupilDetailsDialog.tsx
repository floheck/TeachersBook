import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import InputText from '../Components/Controls/InputText';
import { PupilsViewModel } from 'src/ViewModels/Pupils/PupilsViewModel';

export interface IDialogProps { pupilsViewModel: PupilsViewModel, selectedKlassName: string, saveEvent: any }

class PupilDetailsDialog extends React.Component<IDialogProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
        
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalSave = this.handleModalSave.bind(this);
        
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

    public handleModalSave() {
        this.props.saveEvent();
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
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilSurname} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Vorname</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilFirstname} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Adresse</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilAddress} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Postleitzahl</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilZipCode} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Stadt</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilCity} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-Mail</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilEmail} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Telefon</Form.Label>
                            <InputText data={this.props.pupilsViewModel.addNewPupilModal.newPupilPhone} />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>
                Schließen
                </Button>
                <Button variant="primary" onClick={this.handleModalSave}>
                Speichern
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default PupilDetailsDialog;