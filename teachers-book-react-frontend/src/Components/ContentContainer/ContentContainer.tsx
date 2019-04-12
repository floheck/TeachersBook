import * as React from 'react';
import '../../styles/App.css';
import '../../styles/contentContainer.css';

export interface IContentContainerProps { handleToggle: any}

class ContentContainer extends React.Component<IContentContainerProps> {

  constructor(props: any, context: any) {
    super(props, context);
    
    this.state = {
      toggleState: this.props.handleToggle
    }

  }

  public render() {
    return (
      [
        <div className={this.props.handleToggle ? "content-container content-container-expanded" : "content-container content-container-shrinked" } key="ContentContainerDiv">
          { this.props.children }
        </div>
      ]
    );
  }

}

export default ContentContainer;