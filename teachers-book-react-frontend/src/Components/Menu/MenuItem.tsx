import * as React from 'react';
import '../../styles/App.css';
import '../../styles/navigation.css';

export interface IProperties { href: string }

class MenuItem extends React.Component<IProperties> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  public render() {
    return (
        <div>
            <a className="menu-link" href={ this.props.href } key="ContentContainerDiv">{ this.props.children }</a>
        </div>
    );
  }

}

export default MenuItem;