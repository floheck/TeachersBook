"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timetable = (function () {
    function Timetable() {
        this.rows = new Array();
    }
    return Timetable;
}());
exports.Timetable = Timetable;
var SubjectRow = (function () {
    function SubjectRow() {
        this.id = null;
        this.rowType = null;
        this.subjects = new Array();
    }
    return SubjectRow;
}());
exports.SubjectRow = SubjectRow;
var SubjectRowItem = (function () {
    function SubjectRowItem() {
        this.id = null;
        this.hour = null;
        this.day = null;
        this.lesson = null;
        this.description = null;
    }
    return SubjectRowItem;
}());
exports.SubjectRowItem = SubjectRowItem;
//# sourceMappingURL=timetable.js.map