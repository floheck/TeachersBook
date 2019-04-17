import * as React from 'react';
import { TableCellViewModel } from 'src/ViewModels/Table/tableCellViewModel';
import { TableCell } from './TableCell';
import { TableRowViewModel } from 'src/ViewModels/Table/tableRowViewModel';

export interface IListItemProps {tableRow: TableRowViewModel, id: string, selectEvent: any}

export class TableRow extends React.Component<IListItemProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            tableRow: this.props.tableRow
        }
    }

    public updateRow() {
        console.log("Update row function called!");
    }

    public render() {
        const cells = this.props.tableRow.cells.map((tableCell: TableCellViewModel) => 
            <TableCell TableCellContent = {tableCell.content} hideCell={tableCell.hideSm} key={1} />
        );
        return(
            <tr onClick={this.props.selectEvent} id={this.props.id}>
                {cells}
            </tr>
        );
    }
}