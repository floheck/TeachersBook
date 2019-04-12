import { BaseViewModel } from "../../baseViewModel";

export class SelectOptionViewModel implements BaseViewModel {
    public id: number;
    public value: string;

    constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
    }
} 