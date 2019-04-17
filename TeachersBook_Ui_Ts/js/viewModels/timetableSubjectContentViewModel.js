"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimetableSubjectContentViewModel = (function () {
    function TimetableSubjectContentViewModel() {
        this.id = ko.observable();
        this.name = ko.observable();
        this.schoolGrade = ko.observable();
        this.tTClass = ko.observable();
        this.color = ko.observable();
        this.isNew = ko.observable(false);
    }
    return TimetableSubjectContentViewModel;
}());
exports.TimetableSubjectContentViewModel = TimetableSubjectContentViewModel;
//# sourceMappingURL=timetableSubjectContentViewModel.js.map