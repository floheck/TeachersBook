﻿import { Lesson } from "./lesson";
import { TbClass } from "./tbClass";        

export class Timetable {
    rows = new Array<SubjectRow>();
}

export class SubjectRow {
    id?: string = null;
    rowType?: string = null;
    subjects = new Array<SubjectRowItem>();
}

export class SubjectRowItem {
    id?: string = null;
    hour?: number = null;
    day?: number = null;
    lesson?: Lesson = null;
    description?: string = null;
}