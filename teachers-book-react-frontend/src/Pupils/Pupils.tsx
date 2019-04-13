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
    this.handleModalSave = this.handleModalSave.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      toggleState: true,
      selectedTab: "Klasse 1"
    }
  }

  public handleModalShow() {
    this.myRef.current!.handleModalShow();
  }

  public handleModalSave() {
    const classToAddPupil = this.pupilsViewModel.classes.filter((classItem: ClassViewModel) => {
      return classItem.name === this.state.selectedTab;
    })[0];

    classToAddPupil.addPupil("", 
                              this.pupilsViewModel.addNewPupilModal.newPupilFirstname.value, 
                              this.pupilsViewModel.addNewPupilModal.newPupilSurname.value, 
                              this.pupilsViewModel.addNewPupilModal.newPupilAddress.value,
                              parseInt(this.pupilsViewModel.addNewPupilModal.newPupilZipCode.value, 2),
                              this.pupilsViewModel.addNewPupilModal.newPupilCity.value);
    this.forceUpdate();
  }

  public handleTabChange(item: string) {
    this.setState({selectedTab: item});
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public render() {

    const classes = this.pupilsViewModel.classes.map((classItem: ClassViewModel) => 
      <Nav.Item key="item">
          <Nav.Link eventKey={ classItem.name.trim() } key="link" onSelect={ this.handleTabChange }>{ classItem.name }</Nav.Link>
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
            <PupilDetailsDialog ref={ this.myRef } pupilsViewModel={this.pupilsViewModel} selectedKlassName={this.state.selectedKlassName} saveEvent={this.handleModalSave} />
          </ContentContainerBody>
        </ContentContainer>
      ]
    );
  }

}

export default Pupils;