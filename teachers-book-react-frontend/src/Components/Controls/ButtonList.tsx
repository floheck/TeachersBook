import * as React from 'react';
import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';
import '../../styles/App.css';
import '../../styles/controls.css';
import { ButtonListControlViewModel } from 'src/ViewModels/Controls/ButtonList/ButtonListViewModel';

export interface IProps { data: ButtonListControlViewModel };

class ButtonList extends React.Component<IProps, any> {
  
  constructor(props: any, context: any) {
    super(props, context);    
  }

  public render() {
    const buttons = this.props.data.buttonTexts.map((text: string) => 
      <Button variant="secondary" size="sm" key="1">
        { text } 
      </Button>
    );
    return(
        <div className="button-list-container">
            {buttons}
        </div>
    );
  }

}

export default ButtonList;