import * as React from 'react';
import { TableViewModel } from 'src/ViewModels/Table/tableViewModel';
import { TableRowViewModel } from 'src/ViewModels/Table/tableRowViewModel';
import { TableRowHeader } from './TableRowHeader';
import { TableRow } from './TableRow';
import '../../styles/table.css';

export interface IListProps { listContent: TableViewModel;}

export class Table extends React.Component<IListProps> {
    
    public render() {

        const rows = this.props.listContent.body.map((rowsContent: TableRowViewModel) =>
            <TableRow tableRowContent = {rowsContent.cells} key={1}/>
        );

        return(
            <table className="table">
                <thead>
                    <TableRowHeader tableRowContent = {this.props.listContent.header.cells} key={1}/>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}