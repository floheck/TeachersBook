import * as React from 'react';
import '../../styles/App.css';
import '../../styles/contentContainer.css';

class ContentContainerFooter extends React.Component<any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  public render() {
    return (
      [
        <div className="content-container-footer" key="ContentContainerFooterDiv">
          { this.props.children }
        </div>
      ]
    );
  }

}

export default ContentContainerFooter;