import { TimetableSubjectContentViewModel } from "./timetableSubjectContentViewModel";

export class TimetableSubjectViewModel {
    public id = ko.observable<string>(); 
    public hour = ko.observable<number>();
    public day = ko.observable<number>(); 
    public hasSubject = ko.observable<Boolean>(false); 
    public labelVisible = ko.observable<Boolean>(true); 
    public inlineEditingAllowed = ko.observable<boolean>(false); 
    public inlineEditingVisible = ko.observable<Boolean>(false); 
    public isNew = ko.observable<boolean>(false);
    public content = ko.observable<TimetableSubjectContentViewModel>(new TimetableSubjectContentViewModel());
}