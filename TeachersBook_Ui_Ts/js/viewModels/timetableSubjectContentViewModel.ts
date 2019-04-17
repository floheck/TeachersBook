import { TimetableClassViewModel } from "./timetableClassViewModel";

export class TimetableSubjectContentViewModel {
    public id = ko.observable<string>();
    public name = ko.observable<string>();
    public schoolGrade = ko.observable<string>();
    public tTClass = ko.observable<TimetableClassViewModel>();
    public color = ko.observable<string>();
    public isNew = ko.observable<boolean>(false);
}