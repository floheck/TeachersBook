import { TimetableSubjectViewModel } from "./timetableSubjectViewModel";

export class TimetableRowViewModel {
    public id = ko.observable<string>();
    public rowType = ko.observable<string>();
    public subjects = ko.observableArray<TimetableSubjectViewModel>();
    public isNew = ko.observable<boolean>(false);
}