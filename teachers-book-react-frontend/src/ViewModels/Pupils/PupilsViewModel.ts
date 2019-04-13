import { BaseViewModel } from '../baseViewModel';
import { ClassViewModel } from '../ClassViewModel/ClassViewModel';
import { AddNewPupilModalViewMode } from './AddNewPupilModalViewModel';
import { PupilViewModel } from '../PupilViewModel/PupilViewModel';

export class PupilsViewModel implements BaseViewModel {
    public classes = new Array<ClassViewModel>();
    public addNewPupilModal: AddNewPupilModalViewMode;

    constructor() {
        this.addNewPupilModal = new AddNewPupilModalViewMode();
    }

    // public fromModel() {

    // }

    // public toModel() {
        
    // }

    public addClassOnlyName(name: string) {
        const newClass = new ClassViewModel();
        newClass.name = name;

        this.classes.push(newClass);
    }

    public addClass(newClass: ClassViewModel) {
        this.classes.push(newClass);
    }

    public addPupil(newPupil: PupilViewModel, classIndex: number) {
        this.classes[classIndex].addPupil(newPupil.nickname, newPupil.firstname, newPupil.surname, newPupil.address, newPupil.zipCode, newPupil.city);
    }
}