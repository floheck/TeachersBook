import * as React from 'react';
import '../../styles/App.css';
import { InputControlViewModel } from 'src/ViewModels/Controls/Input/InputViewModel';

export interface IProps { data: InputControlViewModel };

class InputText extends React.Component<IProps, any> {
  
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      value: this.props.data.value
    }
    
    this.inputChange = this.inputChange.bind(this);
  }

  public inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.data.setValue(e.currentTarget.value);
    this.setState({ 
      value: e.currentTarget.value
    });
  }

  public render() {
    return (
      [
        <input key="selectControl" type="text" onChange={this.inputChange} value={this.state.value} />
      ]
    );
  }

}

export default InputText;