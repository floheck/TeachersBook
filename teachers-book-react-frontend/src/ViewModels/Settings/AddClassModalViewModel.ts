import { BaseViewModel } from '../baseViewModel';
import { InputControlViewModel } from '../Controls/Input/InputViewModel';

export class AddClassModalViewModel extends BaseViewModel {
    public className = new InputControlViewModel;

    constructor() {
        super();
    }
}