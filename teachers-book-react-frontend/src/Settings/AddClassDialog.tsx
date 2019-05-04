import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import InputText from '../Components/Controls/InputText';
import { AddClassModalViewModel } from 'src/ViewModels/Settings/AddClassModalViewModel';

export interface IDialogProps { modalViewModel: AddClassModalViewModel, addEvent?: any }

class AddClassDialog extends React.Component<IDialogProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
        
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalAdd = this.handleModalAdd.bind(this);
        
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
                            <Form.Label>Klassenname</Form.Label>
                            <InputText data={this.props.modalViewModel.className} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} sm={12} />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>
                Schließen
                </Button>
                <Button variant="primary" onClick={ this.handleModalAdd }>
                Speichern
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AddClassDialog;