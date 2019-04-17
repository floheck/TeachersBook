import * as React from 'react';
import '../../styles/table.css';

export interface IListCellProps { TableCellContent: string, hideCell: boolean};

export class TableCell extends React.Component<IListCellProps, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.changeValue = this.changeValue.bind(this);

        this.state = {
            value : this.props.TableCellContent
        }
    }
    
    public changeValue(newValue: string) {
        this.setState({
            value: newValue
        })
    }

    public render() {
        return (
            <td className={ this.props.hideCell ? "table-cell-body table-cell-hide-sm" : "table-cell-body" }>
                {this.state.value}
            </td>
        );
    }
}