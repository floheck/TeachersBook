import { BaseViewModel } from '../baseViewModel';
import { TableRowViewModel } from './tableRowViewModel';

export class TableViewModel implements BaseViewModel {

    public header = new TableRowViewModel();
    public body = new Array<TableRowViewModel>();

    public update: boolean = false;
}