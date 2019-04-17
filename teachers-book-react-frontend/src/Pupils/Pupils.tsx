import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Col from 'react-bootstrap/Col';
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
import PupilDetailsDialog from './PupilDetailsDialog';
import { PupilViewModel } from 'src/ViewModels/PupilViewModel/PupilViewModel';

class Pupils extends React.Component<any, any> {
  
  public navigationViewModel = new NavigationViewModel();
  public viewModelFactory = new ViewModelFactory();
  public pupilsViewModel: PupilsViewModel;

  private myRef = React.createRef<PupilDetailsDialog>();

  constructor(props: any, context: any) {
    super(props, context);

    this.pupilsViewModel = this.viewModelFactory.loadPupilsViewModel();

    this.handleToggle = this.handleToggle.bind(this);
    
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalAddNew = this.handleModalAddNew.bind(this);
    this.handleModalUpdate = this.handleModalUpdate.bind(this);

    this.handleShowPupilDetails = this.handleShowPupilDetails.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      toggleState: true,
      selectedTab: "Klasse 1",
      currentClass: this.pupilsViewModel.classes[0],
      selectedPupil: null
    }
  }

  public handleModalShow(event: any) {
    this.pupilsViewModel.pupilDetailsModal.update = false;
    this.pupilsViewModel.pupilDetailsModal.clearAllFields();
    this.myRef.current!.handleModalShow();
  }

  public handleModalAddNew() {
    const classToAddPupil = this.pupilsViewModel.classes.filter((classItem: ClassViewModel) => {
      return classItem.name === this.state.selectedTab;
    })[0];

    classToAddPupil.addPupil("", 
                              this.pupilsViewModel.pupilDetailsModal.pupilFirstname.value, 
                              this.pupilsViewModel.pupilDetailsModal.pupilSurname.value, 
                              this.pupilsViewModel.pupilDetailsModal.pupilAddress.value,
                              this.pupilsViewModel.pupilDetailsModal.pupilZipCode.value,
                              this.pupilsViewModel.pupilDetailsModal.pupilCity.value,
                              this.pupilsViewModel.pupilDetailsModal.pupilPhone.value,
                              this.pupilsViewModel.pupilDetailsModal.pupilEmail.value);
    this.forceUpdate();
  }

  public handleModalUpdate() {
    const selectedPupil = this.state.selectedPupil as PupilViewModel;
    selectedPupil.firstname = this.pupilsViewModel.pupilDetailsModal.pupilFirstname.value;
    selectedPupil.surname = this.pupilsViewModel.pupilDetailsModal.pupilSurname.value;
    selectedPupil.phone = this.pupilsViewModel.pupilDetailsModal.pupilPhone.value;
    selectedPupil.email = this.pupilsViewModel.pupilDetailsModal.pupilEmail.value;
    selectedPupil.address = this.pupilsViewModel.pupilDetailsModal.pupilAddress.value;
    selectedPupil.zipCode = this.pupilsViewModel.pupilDetailsModal.pupilZipCode.value;
    selectedPupil.city = this.pupilsViewModel.pupilDetailsModal.pupilCity.value;
    this.state.currentClass.updatePupil(selectedPupil.id, selectedPupil);
    this.forceUpdate();
  }

  public handleShowPupilDetails(item: any) {
    this.myRef.current!.handleModalShow();
    this.pupilsViewModel.pupilDetailsModal.update = true;
    const currentClass = this.state.currentClass as ClassViewModel;
    const selectedPupilViewModel = currentClass.pupils.filter((pupil: PupilViewModel) => {
      return pupil.id === item.currentTarget.id;
    })[0]
    this.setState({ 
      selectedPupil: selectedPupilViewModel
    });
    this.pupilsViewModel.pupilDetailsModal.pupilFirstname.value = selectedPupilViewModel.firstname;
    this.pupilsViewModel.pupilDetailsModal.pupilSurname.value = selectedPupilViewModel.surname;
    this.pupilsViewModel.pupilDetailsModal.pupilAddress.value = selectedPupilViewModel.address;
    this.pupilsViewModel.pupilDetailsModal.pupilZipCode.value = selectedPupilViewModel.zipCode;
    this.pupilsViewModel.pupilDetailsModal.pupilCity.value = selectedPupilViewModel.city;
    this.pupilsViewModel.pupilDetailsModal.pupilEmail.value = selectedPupilViewModel.email;
    this.pupilsViewModel.pupilDetailsModal.pupilPhone.value = selectedPupilViewModel.phone;
    console.log(item);
  }

  public handleTabChange(item: string) {
    this.setState({selectedTab: item});
    this.setState( { currentClass:  this.pupilsViewModel.classes.filter((classItem: ClassViewModel) => {
      return classItem.name === this.state.selectedTab;
      })[0] 
    });
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public render() {

    const classes = this.pupilsViewModel.classes.map((classItem: ClassViewModel) => 
      <Nav.Item key="item">
          <Nav.Link eventKey={ classItem.name.trim() } key={classItem.id} onSelect={ this.handleTabChange }>{ classItem.name }</Nav.Link>
      </Nav.Item>
    );

    const tabs = this.pupilsViewModel.classes.map((classItem: ClassViewModel) => 
      <Tab.Pane eventKey={classItem.name.trim()} key="tab">
        <Table listContent={ classItem.pupilsTable } selectEvent={this.handleShowPupilDetails} key="PupilsTable1" />
      </Tab.Pane>
    );

    return (
      [
        <Navigation viewModel={ this.navigationViewModel } handleToggle={ this.handleToggle }  key="navigation" />,
        <ContentContainer key="ContentContaierPupils" handleToggle={ this.navigationViewModel.navBarExpanded }>
          <ContentContainerHeader>
            Schüler
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
                      placement="left"
                      overlay={
                        <Tooltip id="id">
                          Schüler hinzufügen.
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
            <PupilDetailsDialog ref={ this.myRef } modalViewModel={this.pupilsViewModel.pupilDetailsModal} selectedKlassName={this.state.selectedKlassName} addEvent={this.handleModalAddNew} updateEvent={this.handleModalUpdate} />
          </ContentContainerBody>
        </ContentContainer>
      ]
    );
  }

}

export default Pupils;