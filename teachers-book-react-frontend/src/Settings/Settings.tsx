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
// import TabControl from '../Components/TabControl/TabControl';
import Navigation from '../Components/Navigation/Navigation';
import '../styles/App.css';
import { NavigationViewModel } from '../ViewModels/Navigation/navigationViewModel';
import { SelectControlViewModel } from 'src/ViewModels/Controls/Select/SelectViewModel';
import { SelectOptionViewModel } from 'src/ViewModels/Controls/Select/SelectOptionViewModel';

class Settings extends React.Component<any> {
  
  public navigationViewModel = new NavigationViewModel();
  public schoolYearsViewModel = new SelectControlViewModel();

  constructor(props: any, context: any) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.schoolYearsViewModel.options = new Array<SelectOptionViewModel>();
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(0, "2017/2018"));
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(1, "2018/2019"));
    this.schoolYearsViewModel.options.push(new SelectOptionViewModel(2, "2019/2020"));
    this.schoolYearsViewModel.selectedValue = new SelectOptionViewModel(1, "2018/2019");

    this.state = {
      toggleState: true
    }
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public handleSave() {
    const test = this.schoolYearsViewModel;
    alert(test);
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
                          <Row>
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
                          <Row>
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
          </ContentContainerBody>
        </ContentContainer>
      ]
    );
  }

}

export default Settings;