import { BaseViewModel } from '../baseViewModel';
import { InputControlViewModel } from '../Controls/Input/InputViewModel';

export class PupilDetailsModalViewMode extends BaseViewModel {
    public pupilFirstname = new InputControlViewModel();
    public pupilSurname = new InputControlViewModel();
    public pupilAddress = new InputControlViewModel();
    public pupilZipCode = new InputControlViewModel();
    public pupilCity = new InputControlViewModel();
    public pupilEmail = new InputControlViewModel();
    public pupilPhone = new InputControlViewModel();

    public update: boolean = false;

    constructor() {
        super();
    }

    public clearAllFields() {
        this.pupilFirstname.value = "";
        this.pupilSurname.value = "";
        this.pupilAddress.value = "";
        this.pupilZipCode.value = "";
        this.pupilCity.value = "";
        this.pupilEmail.value = "";
        this.pupilPhone.value = ""; 
    }
}