import { BaseViewModel } from "../../baseViewModel";
import { SelectOptionViewModel } from './SelectOptionViewModel';

export class SelectControlViewModel implements BaseViewModel {
    public options: SelectOptionViewModel[];
    public selectedValue: SelectOptionViewModel;
}