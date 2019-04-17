import { BaseViewModel } from '../baseViewModel';
import { TableCellViewModel } from './tableCellViewModel';

export class TableRowViewModel implements BaseViewModel {
    public id: string;
    public cells = new Array<TableCellViewModel>();
    public update: boolean = false;
}