import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faClipboardList, faEnvelope, faHome, faIgloo, faKey, faPlusCircle, faTable, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
// import Navigation from './Components/Navigation/Navigation';
import './styles/App.css';
import { NavigationViewModel } from './ViewModels/Navigation/navigationViewModel';
// import ContentContainer from './Components/ContentContainer/ContentContainer';
import Login from './Components/Login/Login';

library.add(faBars, faClipboardList, faEnvelope, faIgloo, faKey, faHome, faPlusCircle, faTable, faTools, faUsers);

class App extends React.Component<any, any> {

  public navigationViewModel = new NavigationViewModel();
  constructor(props: any, context: any) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    
    this.state = {
      toggleState: true
    }
  }

  public handleToggle() {
    this.setState({ toggleState: this.navigationViewModel.navBarExpanded});
  }

  public render() {
    return (
      [
        <Login key="login" />
        // <Navigation viewModel={ this.navigationViewModel } handleToggle={ this.handleToggle } key="navigation" />,
        // <ContentContainer handleToggle={ this.navigationViewModel.navBarExpanded } key="contentContainer" />
      ]
    );
  }
}

export default App;
