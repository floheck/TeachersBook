import { BaseViewModel } from '../baseViewModel';
import { TableCellViewModel } from './tableCellViewModel';

export class TableRowViewModel implements BaseViewModel {
    public id: number;
    public cells = new Array<TableCellViewModel>();
}