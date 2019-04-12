import { BaseViewModel } from '../baseViewModel';
import { ClassViewModel } from '../ClassViewModel/ClassViewModel';
import { AddNewClassModalViewMode } from './AddNewClassModalViewModel';

export class PupilsViewModel implements BaseViewModel {
    public classes = new Array<ClassViewModel>();
    public addNewClassModal: AddNewClassModalViewMode;

    constructor() {
        this.addNewClassModal = new AddNewClassModalViewMode(this.classes);
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
}