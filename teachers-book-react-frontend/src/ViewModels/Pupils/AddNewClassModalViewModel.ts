import { BaseViewModel } from '../baseViewModel';
import { InputControlViewModel } from '../Controls/Input/InputViewModel';
import { ClassViewModel } from '../ClassViewModel/ClassViewModel';

export class AddNewClassModalViewMode extends BaseViewModel {
    public newClassName = new InputControlViewModel();
    public classes = new Array<ClassViewModel>();

    constructor(classes: ClassViewModel[]) {
        super();
        this.classes = classes;
    }

    public save() {
        const newClass = new ClassViewModel();
        newClass.name = this.newClassName.value;
        this.classes.push(newClass);
    }
}