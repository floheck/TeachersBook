import { ClassModel } from './Models/Class/classModel';

export class LocalStorageApi {
    public loadClasses(): ClassModel[] {
        const localStorageString = localStorage.getItem("Classes");

        if(localStorageString) {
            return JSON.parse(localStorageString);
        }
        else {
            return new Array<ClassModel>();
        }
    }

    public saveClasses(classModels: ClassModel[]) {
        localStorage.setItem("Classes", JSON.stringify(classModels));
    }
}