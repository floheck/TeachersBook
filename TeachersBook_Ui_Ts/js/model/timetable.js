"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timetable = (function () {
    function Timetable() {
        this.rows = new Array();
    }
    return Timetable;
}());
exports.Timetable = Timetable;
var TtSubjectRow = (function () {
    function TtSubjectRow() {
        this.id = null;
        this.start = null;
        this.end = null;
        this.rowType = null;
        this.subjects = new Array();
        this.isNew = false;
    }
    return TtSubjectRow;
}());
exports.TtSubjectRow = TtSubjectRow;
var TtSubjectRowItem = (function () {
    function TtSubjectRowItem() {
        this.id = null;
        this.hour = null;
        this.day = null;
        this.lesson = null;
        this.description = null;
    }
    return TtSubjectRowItem;
}());
exports.TtSubjectRowItem = TtSubjectRowItem;
//# sourceMappingURL=timetable.js.map