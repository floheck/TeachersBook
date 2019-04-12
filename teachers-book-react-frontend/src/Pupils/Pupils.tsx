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
import ContentContainer from 'src/Components/ContentContainer/ContentContainer';
import ContentContainerBody from 'src/Components/ContentContainer/ContentContainerBody';
import ContentContainerHeader from 'src/Components/ContentContainer/ContentContainerHeader';
import Navigation from '../Components/Navigation/Navigation';
import '../styles/App.css';
import '../styles/tabControl.css';
import { ClassViewModel } from '../ViewModels/ClassViewModel/ClassViewModel';
import { NavigationViewModel } from '../ViewModels/Navigation/navigationViewModel';
import { PupilsViewModel } from '../ViewModels/Pupils/PupilsViewModel';
import { Table } from '../Components/Table/Table';
import { ViewModelFactory } from 'src/ViewModels/viewModelFactory';
import InputText from '../Components/Controls/InputText';

class Pupils extends React.Component<any, any> {
  
  public navigationViewModel = new NavigationViewModel();
  public viewModelFactory = new ViewModelFactory();
  public pupilsViewModel: PupilsViewModel;

  constructor(props: any, context: any) {
    super(props, context);

    this.pupilsViewModel = this.viewModelFactory.loadPupilsViewModel();

    this.handleToggle = this.handleToggle.bind(this);
    
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
    this.pupilsViewModel.addNewClassModal.save();
    this.handleModalClose();
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public render() {

    const classes = this.pupilsViewModel.classes.map((classItem: ClassViewModel) => 
      <Nav.Item key="item">
          <Nav.Link eventKey={ classItem.name.trim() } key="link">{ classItem.name }</Nav.Link>
      </Nav.Item>
    );

    const tabs = this.pupilsViewModel.classes.map((classItem: ClassViewModel) => 
      <Tab.Pane eventKey={classItem.name.trim()} key="tab">
        <Table listContent={ classItem.getPupilsAsTable() } key="PupilsTable1" />
      </Tab.Pane>
    );

    return (
      [
        <Navigation viewModel={ this.navigationViewModel } handleToggle={ this.handleToggle }  key="navigation" />,
        <ContentContainer key="ContentContaierPupils" handleToggle={ this.navigationViewModel.navBarExpanded }>
          <ContentContainerHeader>
            Schüler je Klasse
          </ContentContainerHeader>
          <ContentContainerBody>
            <Tab.Container id="left-tabs-example" defaultActiveKey="Klasse 1" key="TabContainer">
              <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="nav-pills-left-space">
                      { classes }
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
                          { tabs }
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
                    <InputText data={this.pupilsViewModel.addNewClassModal.newClassName} />
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
          </ContentContainerBody>
        </ContentContainer>
      ]
    );
  }

}

export default Pupils;