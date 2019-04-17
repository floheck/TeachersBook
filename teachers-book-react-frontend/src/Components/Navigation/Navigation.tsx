import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import MenuItem from '../Menu/MenuItem';
import '../../styles/App.css';
import { NavigationViewModel } from '../../ViewModels/Navigation/navigationViewModel';

export interface INavigationViewModel { viewModel: NavigationViewModel, handleToggle: any };

class Navigation extends React.Component<INavigationViewModel> {
  constructor(props: any, context: any) {
    super(props, context);

    this.handleNavToggle = this.handleNavToggle.bind(this);
    
    this.state = {
      toggleState: true
    };
  }

  public handleNavToggle() {
    this.props.viewModel.toggleNavbar();
    this.props.handleToggle();
    this.setState({ toggleState: this.props.viewModel.navBarExpanded });
  }

  public render() {
    return (
      <div className={ this.props.viewModel.navBarExpanded ? "menu-container" : "menu-container-shrinked"}>
        <div className="menu-expander" onClick={ this.handleNavToggle }>
          <FontAwesomeIcon icon="bars" />
        </div>
        <div className={ this.props.viewModel.navBarExpanded ? "menu-bar menu-expand" : "menu-bar menu-shrinked"}>
        <div className="menu-logo">
          <p>Logo</p>
        </div>
          <MenuItem href="/"><div className={ this.props.viewModel.navBarExpanded ? "menu-bar-icon" : "menu-bar-icon-shrinked"}><FontAwesomeIcon icon="home" /></div><div className={ this.props.viewModel.navBarExpanded ? "menu-text-visible" : "menu-text-hidden" }>Home</div></MenuItem>
          <MenuItem href="/pupils"><div className={ this.props.viewModel.navBarExpanded ? "menu-bar-icon" : "menu-bar-icon-shrinked"}><FontAwesomeIcon icon="users" /></div><div className={ this.props.viewModel.navBarExpanded ? "menu-text-visible" : "menu-text-hidden" }>Schüler</div></MenuItem>
          <MenuItem href="/lists"><div className={ this.props.viewModel.navBarExpanded ? "menu-bar-icon" : "menu-bar-icon-shrinked"}><FontAwesomeIcon icon="clipboard-list" /></div><div className={ this.props.viewModel.navBarExpanded ? "menu-text-visible" : "menu-text-hidden" }>Listen</div></MenuItem>
          <MenuItem href="/"><div className={ this.props.viewModel.navBarExpanded ? "menu-bar-icon" : "menu-bar-icon-shrinked"}><FontAwesomeIcon icon="table" /></div><div className={ this.props.viewModel.navBarExpanded ? "menu-text-visible" : "menu-text-hidden" }>Stundenplan</div></MenuItem>
          <MenuItem href="/settings"><div className={ this.props.viewModel.navBarExpanded ? "menu-bar-icon" : "menu-bar-icon-shrinked"}><FontAwesomeIcon icon="tools" /></div><div className={ this.props.viewModel.navBarExpanded ? "menu-text-visible" : "menu-text-hidden" }>Einstellungen</div></MenuItem>
        </div>
      </div>
    );
  }

}

export default Navigation;
