import { BaseViewModel } from '../baseViewModel';
import { ClassViewModel } from '../ClassViewModel/ClassViewModel';
import { PupilDetailsModalViewMode } from './PupilDetailsModalViewModel';
import { PupilViewModel } from '../PupilViewModel/PupilViewModel';

export class PupilsViewModel implements BaseViewModel {
    public classes = new Array<ClassViewModel>();
    public pupilDetailsModal: PupilDetailsModalViewMode;

    constructor() {
        this.pupilDetailsModal = new PupilDetailsModalViewMode();
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