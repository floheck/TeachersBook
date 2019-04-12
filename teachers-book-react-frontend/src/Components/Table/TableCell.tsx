import * as React from 'react';
import '../../styles/table.css';

export interface IListCellProps { TableCellContent: string, hideCell: boolean};

export class TableCell extends React.Component<IListCellProps> {

    public render() {
        return (
            <td className={ this.props.hideCell ? "table-cell-body table-cell-hide-sm" : "table-cell-body" }>
                {this.props.TableCellContent}
            </td>
        );
    }
}