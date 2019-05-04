import { BaseViewModel } from "../../baseViewModel";
import { ClassModel } from 'src/Models/Class/classModel';

export class ButtonListControlViewModel implements BaseViewModel {
    public buttonTexts = new Array<string>();

    public addButton(text: string) {
        this.buttonTexts.push(text);
    }

    public toModel(): ClassModel[] {
        const newClasses = new Array<ClassModel>();
        
        for(const item of this.buttonTexts) {
            const newClass = new ClassModel();
            newClass.id = this.createGuid();
            newClass.name = item;
            newClasses.push(newClass);
        }

        return newClasses;
    }

    private createGuid()  
    {  
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {  
          const r = Math.random()*16|0;
          const v = c === 'x' ? r : (r&0x3|0x8);  
          return v.toString(16);  
       });  
    } 
}