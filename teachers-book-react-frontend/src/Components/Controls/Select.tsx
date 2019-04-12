import * as React from 'react';
// import Form from 'react-bootstrap/Form';
import '../../styles/App.css';
import { SelectControlViewModel } from 'src/ViewModels/Controls/Select/SelectViewModel';
import { SelectOptionViewModel } from 'src/ViewModels/Controls/Select/SelectOptionViewModel';

export interface IProps { data: SelectControlViewModel };

class Select extends React.Component<IProps> {
  
  constructor(props: any, context: any) {
    super(props, context);

    this.selectChange = this.selectChange.bind(this);
    this.state = {
      value: null
    }
  }

  public selectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    for(const item of this.props.data.options) {
      if(item.value === e.currentTarget.value) {
        this.props.data.selectedValue = item;
      }
    }    
  }

  public render() {
    const cells = this.props.data.options.map((tableCell: SelectOptionViewModel) => 
    <option id={ tableCell.id.toString() } key={ tableCell.id.toString() } selected={ tableCell.id === this.props.data.selectedValue.id ? true : false } >{ tableCell.value }</option>
    );
    return (
      [
        <select key="selectControl" onChange={this.selectChange}>
          {cells}
        </select>
      ]
    );
  }

}

export default Select;