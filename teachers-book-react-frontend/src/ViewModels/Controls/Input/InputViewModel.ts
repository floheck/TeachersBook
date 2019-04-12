import { BaseViewModel } from "../../baseViewModel";

export class InputControlViewModel implements BaseViewModel {
    public value: string;

    public setValue(newValue: string) {
        this.value = newValue;
    }
}