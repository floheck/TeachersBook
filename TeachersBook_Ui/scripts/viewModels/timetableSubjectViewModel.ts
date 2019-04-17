import { TimetableSubjectContentViewModel } from "./timetableSubjectContentViewModel";

export class TimetableSubjectViewModel {
    id?: string = null; 
    hour?: number = null;
    day?: number = null; 
    hasSubject: KnockoutObservable<Boolean>; 
    labelVisible: KnockoutObservable<Boolean>; 
    inlineEditingAllowed?: boolean = false; 
    inlineEditingVisible: KnockoutObservable<Boolean>; 
    isNew?: boolean = false;
    content: TimetableSubjectContentViewModel = null;
}