import * as React from 'react';
import '../../styles/App.css';
import '../../styles/contentContainer.css';

class ContentContainerBody extends React.Component<any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  public render() {
    return (
      [
        <div className="content-container-body" key="ContentContainerBodyDiv">
          { this.props.children }
        </div>
      ]
    );
  }

}

export default ContentContainerBody;