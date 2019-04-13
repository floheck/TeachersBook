import { BaseViewModel } from '../baseViewModel';
import { InputControlViewModel } from '../Controls/Input/InputViewModel';
import { PupilViewModel } from '../PupilViewModel/PupilViewModel';

export class AddNewPupilModalViewMode extends BaseViewModel {
    public newPupilFirstname = new InputControlViewModel();
    public newPupilSurname = new InputControlViewModel();
    public newPupilAddress = new InputControlViewModel();
    public newPupilZipCode = new InputControlViewModel();
    public newPupilCity = new InputControlViewModel();
    public newPupilEmail = new InputControlViewModel();
    public newPupilPhone = new InputControlViewModel();
    public pupils = new Array<PupilViewModel>();

    constructor() {
        super();
    }

    public save() {
        const newPupil = new PupilViewModel();
        newPupil.firstname = this.newPupilFirstname.value;
        newPupil.surname = this.newPupilSurname.value;
        newPupil.address = this.newPupilAddress.value;
        newPupil.zipCode = parseInt(this.newPupilZipCode.value, 2);
        newPupil.city = this.newPupilCity.value;
        newPupil.email = this.newPupilEmail.value;
        newPupil.phone = this.newPupilPhone.value;
        this.pupils.push(newPupil);
    }
}