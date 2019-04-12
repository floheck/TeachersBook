import * as React from 'react';
import '../../styles/App.css';
import { InputControlViewModel } from 'src/ViewModels/Controls/Input/InputViewModel';

export interface IProps { data: InputControlViewModel };

class InputText extends React.Component<IProps> {
  
  constructor(props: any, context: any) {
    super(props, context);

    this.inputChange = this.inputChange.bind(this);
    this.state = {
      value: null
    }
  }

  public inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.data.setValue(e.currentTarget.value);
  }

  public render() {
    return (
      [
        <input key="selectControl" type="text" onChange={this.inputChange} />
      ]
    );
  }

}

export default InputText;