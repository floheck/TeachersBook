import { BaseViewModel } from '../baseViewModel';

export class TableCellViewModel implements BaseViewModel {
    public id: number;
    public content: string;
    public hideSm: boolean;

    constructor(id?: number, content?: string, hideSm?: boolean) {
        if(id !== undefined) {
            this.id = id;
        }

        if(content !== undefined) {
            this.content = content;
        }

        if(hideSm !== undefined) {
            this.hideSm = hideSm;
        }
    }
}