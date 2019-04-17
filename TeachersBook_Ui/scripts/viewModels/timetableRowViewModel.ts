import { TimetableSubjectViewModel } from "./timetableSubjectViewModel";

export class TimetableRowViewModel {
    id?: string = null;
    rowType?: string = null;
    subjects?: KnockoutObservableArray<TimetableSubjectViewModel>;
    isNew?: boolean = false;
}