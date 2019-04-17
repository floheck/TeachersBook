import * as React from 'react';
import { TableViewModel } from 'src/ViewModels/Table/tableViewModel';
import { TableRowViewModel } from 'src/ViewModels/Table/tableRowViewModel';
import { TableRowHeader } from './TableRowHeader';
import { TableRow } from './TableRow';
import '../../styles/table.css';

export interface IListProps { listContent: TableViewModel, selectEvent: any }

export class Table extends React.Component<IListProps, any> {
    
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            listContent: this.props.listContent
        }
    }

    public shouldComponentUpdate(nextProps: IListProps) {
        let returnValue = false;
        
        if(nextProps.listContent.update) {
            this.setState({
                listContent: nextProps.listContent
            })
            this.props.listContent.update = false;
            returnValue = true;
        }
        
        return returnValue;        
    }

    public render() {

        const rows = this.state.listContent.body.map((rowsContent: TableRowViewModel) =>
            <TableRow tableRow = {rowsContent} id={rowsContent.id} selectEvent={this.props.selectEvent} key={rowsContent.id}/>
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