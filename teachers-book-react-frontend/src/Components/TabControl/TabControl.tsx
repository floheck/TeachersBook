import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tooltip from 'react-bootstrap/Tooltip';
import { InputControlViewModel } from 'src/ViewModels/Controls/Input/InputViewModel';
import { TableViewModel } from 'src/ViewModels/Table/tableViewModel';
import '../../styles/App.css';
import '../../styles/tabControl.css';
import { Table } from '../Table/Table';
import InputText from '../Controls/InputText';

class Pupils extends React.Component<any, any> {
  
  public input = new InputControlViewModel 

  constructor(props: any, context: any) {
    super(props, context);

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = {
      modalShow: false,
    };

  }

  public handleModalClose() {
    this.setState({ modalShow: false });
    const test = this.input;
    alert(test.value);
  }

  public handleModalShow() {
    this.setState({ modalShow: true });
  }

  public render() {

    const tableViewModel: TableViewModel = new TableViewModel();

    return ([
      <Tab.Container id="left-tabs-example" defaultActiveKey="first" key="TabContainer">
        <Row>
            <Col sm={12}>
              <Nav variant="pills" className="nav-pills-left-space">
                <Nav.Item>
                    <Nav.Link eventKey="first">Klasse 1a</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second">Klasse 2b</Nav.Link>
                </Nav.Item>
              </Nav>              
              <OverlayTrigger
                key="Overlay"
                placement="top"
                overlay={
                  <Tooltip id="id">
                    Neue Klasse hinzufügen.
                  </Tooltip>
                }
              >
                <div className="nav-pills-action-button"><a onClick={this.handleModalShow}><FontAwesomeIcon icon="plus-circle" /></a></div>
              </OverlayTrigger>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Table listContent={ tableViewModel } key="PupilsTable1" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    Das ist Tab 2
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
      </Tab.Container>,
      <Modal show={this.state.modalShow} onHide={this.handleModalClose} key="Modal">
        <Modal.Header closeButton={true}>
          <Modal.Title>Neue Klasse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <p>Bitte geben Sie den Namen an:</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <InputText data={this.input} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    ]
    );
  }

}

export default Pupils;