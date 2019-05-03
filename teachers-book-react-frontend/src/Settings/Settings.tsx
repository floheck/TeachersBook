import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ContentContainer from 'src/Components/ContentContainer/ContentContainer';
import ContentContainerBody from 'src/Components/ContentContainer/ContentContainerBody';
import ContentContainerHeader from 'src/Components/ContentContainer/ContentContainerHeader';
import Select from 'src/Components/Controls/Select';
import ButtonList from 'src/Components/Controls/ButtonList';
// import TabControl from '../Components/TabControl/TabControl';
import Navigation from '../Components/Navigation/Navigation';
import '../styles/App.css';
import '../styles/settings.css';
import { NavigationViewModel } from '../ViewModels/Navigation/navigationViewModel';
import { ButtonListControlViewModel } from 'src/ViewModels/Controls/ButtonList/ButtonListViewModel';
import { SelectControlViewModel } from 'src/ViewModels/Controls/Select/SelectViewModel';
import { SelectOptionViewModel } from 'src/ViewModels/Controls/Select/SelectOptionViewModel';
import AddClassDialog from './AddClassDialog';
import { AddClassModalViewModel } from 'src/ViewModels/Settings/AddClassModalViewModel';
import { LocalStorageApi } from 'src/localStorageApi';

class Settings extends React.Component<any> {
  
  public navigationViewModel = new NavigationViewModel();
  public schoolYearsViewModel = new SelectControlViewModel();
  public classesViewModel = new ButtonListControlViewModel();
  public addClassModalDialog = new AddClassModalViewModel();

  private localStorageApi = new LocalStorageApi();
  private myRef = React.createRef<AddClassDialog>();

  constructor(props: any, context: any) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShowAddClassModal = this.handleShowAddClassModal.bind(this);
    this.handleAddNewClass = this.handleAddNewClass.bind(this);

    this.schoolYearsViewModel.options = new Array<SelectOptionViewModel>();
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(0, "2017/2018"));
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(1, "2018/2019"));
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(2, "2019/2020"));
    this.schoolYearsViewModel.selectedValue = new SelectOptionViewModel(1, "2018/2019");

    this.classesViewModel.addButton("Klasse 1");
    this.classesViewModel.addButton("Klasse 2");

    this.state = {
      toggleState: true
    }
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public handleSave() {
    const test = this.schoolYearsViewModel;
    this.localStorageApi.saveClasses(this.classesViewModel.toModel());
    alert(test);
  }

  public handleShowAddClassModal() {
    this.myRef.current!.handleModalShow();
  }

  public handleAddNewClass() {
    this.classesViewModel.addButton(this.addClassModalDialog.className.value);
    this.addClassModalDialog.className.value = "";
    this.forceUpdate();
  }

  public render() {
    return (
      [
        <Navigation viewModel={ this.navigationViewModel } handleToggle={ this.handleToggle }  key="navigation" />,
        <ContentContainer key="ContentContaierPupils" handleToggle={ this.navigationViewModel.navBarExpanded }>
          <ContentContainerHeader>
            Einstellungen
          </ContentContainerHeader>
          <ContentContainerBody>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={12}>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Allgemein</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Meine Daten</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <Row className="row-list">
                            <Col xl={6} sm={12}>
                              <Row>
                                <Col xl={6}>
                                  Aktuelles Schuljahr:
                                </Col>
                                <Col xl={6}>
                                  <Select data={ this.schoolYearsViewModel } />
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={6} sm={12} />
                          </Row>
                          <Row className="row-list">
                            <Col xl={3} sm={12}>
                              <Row>
                                <Col xl={12}>
                                  Klassen:
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={9} sm={12} >
                              <Row>
                                <Col xl={12}>
                                    <ButtonList data={ this.classesViewModel } />
                                    <div className="nav-pills-action-button-float-left"><a href="#" onClick={ this.handleShowAddClassModal }><FontAwesomeIcon icon="plus-circle" /></a></div>
                                  </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="row-list">
                            <Col xl={6} sm={12}>
                              <Button onClick={ this.handleSave }>Speichern</Button>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          Meine Daten
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
          </Tab.Container>
          <AddClassDialog ref={ this.myRef } modalViewModel={ this.addClassModalDialog } addEvent={ this.handleAddNewClass } />
          </ContentContainerBody>
        </ContentContainer>
      ]
    );
  }

}

export default Settings;