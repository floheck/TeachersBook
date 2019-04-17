System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Timetable, SubjectRow, SubjectRowItem;
    return {
        setters: [],
        execute: function () {
            Timetable = (function () {
                function Timetable() {
                    this.rows = null;
                }
                return Timetable;
            }());
            exports_1("Timetable", Timetable);
            SubjectRow = (function () {
                function SubjectRow() {
                    this.id = null;
                    this.rowType = null;
                    this.subjects = null;
                }
                return SubjectRow;
            }());
            exports_1("SubjectRow", SubjectRow);
            SubjectRowItem = (function () {
                function SubjectRowItem() {
                    this.id = null;
                    this.hour = null;
                    this.day = null;
                    this.lesson = null;
                    this.description = null;
                }
                return SubjectRowItem;
            }());
            exports_1("SubjectRowItem", SubjectRowItem);
        }
    };
});
//# sourceMappingURL=timetable.js.map