"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timetableSubjectContentViewModel_1 = require("./timetableSubjectContentViewModel");
var TimetableSubjectViewModel = (function () {
    function TimetableSubjectViewModel() {
        this.id = ko.observable();
        this.hour = ko.observable();
        this.day = ko.observable();
        this.start = ko.observable();
        this.end = ko.observable();
        this.hasSubject = ko.observable(false);
        this.labelVisible = ko.observable(true);
        this.inlineEditingAllowed = ko.observable(false);
        this.inlineEditingVisible = ko.observable(false);
        this.isNew = ko.observable(false);
        this.content = ko.observable(new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel());
    }
    return TimetableSubjectViewModel;
}());
exports.TimetableSubjectViewModel = TimetableSubjectViewModel;
//# sourceMappingURL=timetableSubjectViewModel.js.map