import * as React from 'react';
import { TableCellViewModel } from 'src/ViewModels/Table/tableCellViewModel';
import { TableCell } from './TableCell';
import '../../styles/table.css';

export interface IListItemProps {tableRowContent: TableCellViewModel[]}

export class TableRowHeader extends React.Component<IListItemProps> {
    constructor(props: any) {
        super(props);
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        const cells = this.props.tableRowContent.map((tableCell: TableCellViewModel) => 
            <TableCell TableCellContent = {tableCell.content} hideCell = { tableCell.hideSm } key={1} />
        );
        return(
            <tr>
                {cells}
            </tr>
        );
    }
    
    private handleChange(event: any) {
        this.setState({value: event.target.value});
    }

}