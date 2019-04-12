import { TtLesson } from "./lesson";
import { TtClass } from "./tbClass";        

export class Timetable {
    rows = new Array<TtSubjectRow>();
}

export class TtSubjectRow {
    id?: string = null;
    start?: string = null;
    end?: string = null;
    rowType?: string = null;
    subjects = new Array<TtSubjectRowItem>();
    isNew: boolean = false;
}

export class TtSubjectRowItem {
    id?: string = null;
    hour?: number = null;
    day?: number = null;
    lesson?: TtLesson = null;
    description?: string = null;
}