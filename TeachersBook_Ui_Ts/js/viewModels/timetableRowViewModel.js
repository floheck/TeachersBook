"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimetableRowViewModel = (function () {
    function TimetableRowViewModel() {
        this.id = ko.observable();
        this.rowType = ko.observable();
        this.subjects = ko.observableArray();
        this.isNew = ko.observable(false);
    }
    return TimetableRowViewModel;
}());
exports.TimetableRowViewModel = TimetableRowViewModel;
//# sourceMappingURL=timetableRowViewModel.js.map